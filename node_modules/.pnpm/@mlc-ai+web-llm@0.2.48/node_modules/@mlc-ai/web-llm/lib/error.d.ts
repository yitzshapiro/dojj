export declare class ModelNotFoundError extends Error {
    constructor(modelId: string);
}
export declare class ConfigValueError extends Error {
    constructor(message: string);
}
export declare class MinValueError extends ConfigValueError {
    constructor(paramName: string, minValue: number);
}
export declare class RangeError extends ConfigValueError {
    constructor(paramName: string, minValue: number, maxValue: number, additionalMessage?: string);
}
export declare class NonNegativeError extends ConfigValueError {
    constructor(paramName: string);
}
export declare class InvalidNumberStringError extends ConfigValueError {
    constructor(paramName: string, actualValue?: string);
}
export declare class DependencyError extends ConfigValueError {
    constructor(dependentParam: string, requiredParam: string, requiredValue: any);
}
export declare class WebGPUNotAvailableError extends Error {
    constructor();
}
export declare class WebGPUNotFoundError extends Error {
    constructor();
}
export declare class ModelNotLoadedError extends Error {
    constructor();
}
export declare class WorkerEngineModelNotLoadedError extends Error {
    constructor(engineName: string);
}
export declare class MessageOrderError extends Error {
    constructor(message: string);
}
export declare class SystemMessageOrderError extends Error {
    constructor();
}
export declare class ContentTypeError extends Error {
    constructor(name: string);
}
export declare class UserMessageContentError extends Error {
    constructor(content: any);
}
export declare class UnsupportedRoleError extends Error {
    constructor(role: string);
}
export declare class ToolCallOutputParseError extends Error {
    constructor(outputMessage: string, error: Error);
}
export declare class ToolCallOutputInvalidTypeError extends Error {
    constructor(expectedType: string);
}
export declare class ToolCallOutputMissingFieldsError extends Error {
    constructor(missingFields: string[], object: any);
}
export declare class ConfigurationNotInitializedError extends Error {
    constructor();
}
export declare class MissingModelWasmError extends Error {
    constructor(modelId: string);
}
export declare class FeatureSupportError extends Error {
    constructor(feature: string);
}
export declare class UnsupportedFieldsError extends Error {
    constructor(unsupportedFields: string[]);
}
export declare class ShaderF16SupportError extends FeatureSupportError {
    constructor();
}
export declare class DeviceLostError extends Error {
    constructor();
}
export declare class InvalidToolChoiceError extends Error {
    constructor(toolChoice: string);
}
export declare class UnsupportedToolChoiceTypeError extends Error {
    constructor();
}
export declare class FunctionNotFoundError extends Error {
    constructor(functionName: string);
}
export declare class UnsupportedToolTypeError extends Error {
    constructor();
}
export declare class ChatModuleNotInitializedError extends Error {
    constructor();
}
export declare class UnsupportedTokenizerFilesError extends Error {
    constructor(files: string[]);
}
export declare class WindowSizeConfigurationError extends Error {
    constructor(contextWindowSize: number, slidingWindowSize: number);
}
export declare class AttentionSinkSizeError extends Error {
    constructor();
}
export declare class WindowSizeSpecificationError extends Error {
    constructor();
}
export declare class ContextWindowSizeExceededError extends Error {
    constructor(numPromptTokens: number, contextWindowSize: number);
}
export declare class NonWorkerEnvironmentError extends Error {
    constructor(className: string);
}
export declare class NoServiceWorkerAPIError extends Error {
    constructor();
}
export declare class ServiceWorkerInitializationError extends Error {
    constructor();
}
export declare class StreamingCountError extends Error {
    constructor();
}
export declare class SeedTypeError extends Error {
    constructor(seed: any);
}
export declare class InvalidResponseFormatError extends Error {
    constructor();
}
export declare class CustomResponseFormatError extends Error {
    constructor(currentFormat: any);
}
export declare class UnsupportedModelIdError extends Error {
    constructor(currentModelId: string, supportedModelIds: string[]);
}
export declare class CustomSystemPromptError extends Error {
    constructor();
}
export declare class InvalidStreamOptionsError extends Error {
    constructor();
}
export declare class UnknownMessageKindError extends Error {
    constructor(msgKind: string, msgContent: any);
}
//# sourceMappingURL=error.d.ts.map