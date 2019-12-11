{
  "targets": [
    {
      "target_name": "function_origin",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [ "src/function_origin.cc" ]
    }
  ]
}
