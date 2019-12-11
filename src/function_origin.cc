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

  target->Set(
    context,
    String::NewFromUtf8(isolate, "file", NewStringType::kNormal).ToLocalChecked(),
    origin.ResourceName()
  ).FromJust();
  target->Set(
    context,
    String::NewFromUtf8(isolate, "line", NewStringType::kNormal).ToLocalChecked(),
    Integer::New(isolate, fn->GetScriptLineNumber())
  ).FromJust();
  target->Set(
    context,
    String::NewFromUtf8(isolate, "column", NewStringType::kNormal).ToLocalChecked(),
    Integer::New(isolate, fn->GetScriptColumnNumber())
  ).FromJust();
  target->Set(
    context,
    String::NewFromUtf8(isolate, "inferredName", NewStringType::kNormal).ToLocalChecked(),
    fn->GetInferredName()
  ).FromJust();
}

static void Init(Local<Object> exports, Local<Object> module) {
  NODE_SET_METHOD(module, "exports", SetOrigin);
}

NODE_MODULE(function_origin, Init)
