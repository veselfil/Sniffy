{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "hello.cc" ],
      "include_dirs": ["include", "C:/Dev/ROP/NodeJS_BindingTest/Include", "<!(node -e \"require('nan')\")"],
	  "libraries": ["C:/Dev/ROP/NodeJS_BindingTest/Lib/x64/wpcap.lib", "C:/Dev/ROP/NodeJS_BindingTest/Lib/x64/Packet.lib"]
    }
  ]
}
