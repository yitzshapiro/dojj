import { CreateMLCEngine, MLCEngineInterface, ChatCompletionMessageParam } from '@mlc-ai/web-llm';

interface Task {
  name: string;
  dueDate: string;
  priority: string;
}

interface EmailTaskData {
  email: string;
  apiKey: string;
  boardId: string;
}

interface ChatMessageParams {
    role: 'user' | 'system' | 'assistant';
    content: string;
    tool_call_id?: string;  // Include other fields if necessary, optional for now
}

// Function to create a compliant message object
const createChatMessage = (params: ChatMessageParams): ChatCompletionMessageParam => {
    return {
        role: params.role,
        content: params.content,
        tool_call_id: params.tool_call_id  // This can be optional
    };
};

// Initialize WebLLM with the specified model
const MODEL_ID = 'Phi-3-mini-128k-instruct-q0f16-MLC';  // Adjust this as necessary

let engine: MLCEngineInterface;

const initializeWebLLM = async () => {
    try {
      engine = await CreateMLCEngine(MODEL_ID);
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Failed to initialize the WebLLM engine:', error);
    }
};

// Parse the email content to extract tasks
const parseEmailWithWebLLM = async (emailContent: string): Promise<Task[]> => {
    if (!engine) {
      await initializeWebLLM();
    }
    try {
      const messages = [createChatMessage({ role: "user", content: emailContent })];
      const response = await engine.chat.completions.create({
        messages,
        max_tokens: 1024,
        temperature: 0.7
      });
      return extractTasksFromResponse(response);
    } catch (error) {
      console.error('Error parsing email:', error);
      return [];
    }
};

// Extract tasks based on the model's response
const extractTasksFromResponse = (response: any): Task[] => {
    if (!response || !response.tasks || !Array.isArray(response.tasks)) {
      console.error('Invalid response structure:', response);
      return [];
    }
    return response.tasks.map((task: any) => ({
      name: task.text || "Unnamed Task",
      dueDate: task.details?.dueDate || "No due date",
      priority: task.details?.priority || "Low"
    }));
};

// Create a task on Monday.com
const createTaskOnMonday = async (task: Task, apiKey: string, boardId: string) => {
  const url = `https://api.monday.com/v2/boards/${boardId}/items`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      'name': task.name,
      'due_date': task.dueDate,
      'priority': task.priority
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to create task: ${await response.text()}`);
  }
};

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request: EmailTaskData, sender, sendResponse) => {
  if (request.email) {
    parseEmailWithWebLLM(request.email).then(tasks => {
      tasks.forEach(task => {
        createTaskOnMonday(task, request.apiKey, request.boardId)
          .then(() => sendResponse({status: 'success'}))
          .catch(error => sendResponse({status: 'error', message: error.message}));
      });
    }).catch(error => sendResponse({status: 'error', message: error.message}));
    return true; // Indicate that the response is asynchronous
  }
});

// Initialize the engine at startup
initializeWebLLM();
