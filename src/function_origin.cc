#include <node.h>

using v8::Context;
using v8::FunctionCallbackInfo;
using v8::Function;
using v8::Integer;
using v8::Isolate;
using v8::Local;
using v8::NewStringType;
using v8::Object;
using v8::ScriptOrigin;
using v8::String;
using v8::Value;

void SetOrigin(const FunctionCallbackInfo<Value>& info) {
  Isolate* isolate = info.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();

  Local<Function> fn = info[0].As<Function>();
  Local<Object> target = info[1].As<Object>();

  // For bound functions the returned resource name is empty and line and
  // column numbers are meaningless.
  // In this case we keep the inferredName of the bound function, but
  // get all other information from the function from which the
  // bound function was created.
  Local<Value> bound;
  while (true) {
    bound = fn->GetBoundFunction();
    if (bound->IsFunction()) {
      fn = bound.As<Function>();
    } else {
      break;
    }
  }

  ScriptOrigin origin = fn->GetScriptOrigin();

  Local<String> fileKey = String::NewFromUtf8(isolate, "file", NewStringType::kNormal).ToLocalChecked();
  Local<String> lineKey = String::NewFromUtf8(isolate, "line", NewStringType::kNormal).ToLocalChecked();
  Local<String> columnKey = String::NewFromUtf8(isolate, "column", NewStringType::kNormal).ToLocalChecked();
  Local<String> inferredNameKey = String::NewFromUtf8(isolate, "inferredName", NewStringType::kNormal).ToLocalChecked();

  Local<Value> resourceName = origin.ResourceName();
  int lineNumber = fn->GetScriptLineNumber();
  int columnNumber = fn->GetScriptColumnNumber();
  
  Local<Value> inferredName = fn->GetDebugName();

  if (!resourceName.IsEmpty()) {
    target->Set(context, fileKey, resourceName).FromJust();
  }
  target->Set(context, lineKey, Integer::New(isolate, lineNumber)).FromJust();
  target->Set(context, columnKey, Integer::New(isolate, columnNumber)).FromJust();
  if (!inferredName.IsEmpty()) {
    target->Set(context, inferredNameKey, inferredName).FromJust();
  }
}

NODE_MODULE_INIT() {
  NODE_SET_METHOD(exports, "setOrigin", SetOrigin);
}
