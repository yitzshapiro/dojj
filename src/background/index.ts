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
    tool_call_id?: string;
}

const createChatMessage = (params: ChatMessageParams): ChatCompletionMessageParam => {
    console.log('Creating chat message:', params);
    return {
        role: params.role,
        content: params.content,
        tool_call_id: params.tool_call_id || undefined
    };
};

const MODEL_ID = 'Phi-3-mini-4k-instruct-q4f16_1-MLC-1k';

let engine: MLCEngineInterface;

const initializeWebLLM = async () => {
  try {
      engine = await CreateMLCEngine(MODEL_ID);
      console.log('Model loaded successfully');
  } catch (error) {
      if (error instanceof DOMException) {
          console.error('DOMException encountered:', error.message);
      } else {
          console.error('Failed to initialize the WebLLM engine:', error);
      }
  }
};

const parseEmailWithWebLLM = async (emailContent: string): Promise<Task[]> => {
    console.log('Parsing email content with WebLLM');
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

const extractTasksFromResponse = (response: any): Task[] => {
    console.log('Extracting tasks from response:', response);
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

const createTaskOnMonday = async (task: Task, apiKey: string, boardId: string) => {
  console.log('Creating task on Monday.com:', task);
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
    const errorMessage = await response.text();
    console.error('Failed to create task:', errorMessage);
    throw new Error(`Failed to create task: ${errorMessage}`);
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message from Chrome extension:', request);
  if (request.action === "requestEmailContent" && sender.tab && sender.tab.id) {
    chrome.tabs.sendMessage(sender.tab.id, {action: "extractEmail"});
  } else if (request.email) {
    parseEmailWithWebLLM(request.email).then(tasks => {
      tasks.forEach(task => {
        createTaskOnMonday(task, request.apiKey, request.boardId)
          .then(() => sendResponse({status: 'success'}))
          .catch(error => {
            console.error('Error creating task on Monday:', error);
            sendResponse({status: 'error', message: error.message});
          });
      });
    }).catch(error => {
      console.error('Error handling email:', error);
      sendResponse({status: 'error', message: error.message});
    });
    return true; // Indicates that the response will be sent asynchronously
  }
});

initializeWebLLM();
