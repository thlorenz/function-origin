#include <node.h>
#include <nan.h>

using namespace v8;

NAN_METHOD(GetFunctionInfo) {
  Local<Function> fn = info[0].As<Function>();
  Local<Function> callback = info[1].As<Function>();

  ScriptOrigin origin = fn->GetScriptOrigin();

  Local<Value> file = origin.ResourceName();
  // For some reasons some files are not defined at times
  // Therefore we check all strings
  if (file.IsEmpty()) {
    file = Nan::New<String>("n/a").ToLocalChecked();
  }
  Local<Value> inferredName = fn->GetInferredName();
  if (inferredName.IsEmpty()) {
    inferredName = Nan::New<String>("n/a").ToLocalChecked();
  }

  Local<Integer> line = Nan::New<Integer>(fn->GetScriptLineNumber());
  Local<Integer> column = Nan::New<Integer>(fn->GetScriptColumnNumber());

  Local<Value> argv[] = { file, line, column, inferredName };
  callback->Call(info.This(), 4, argv);
}

static void Init(Handle<Object> exports) {
  exports->Set(Nan::New<String>("GetFunctionInfo").ToLocalChecked(),
    Nan::New<FunctionTemplate>(GetFunctionInfo)->GetFunction());
}

NODE_MODULE(function_origin, Init)
