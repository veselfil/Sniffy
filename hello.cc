#define WPCAP
#define HAVE_REMOTE

#include <stdlib.h>
#include <stdio.h>

//
// NOTE: remember to include WPCAP and HAVE_REMOTE among your
// preprocessor definitions.
//

//#include <node.h>
#include <nan.h>

using namespace v8;
using namespace Nan;

#include <pcap/pcap.h>

#include "structs.h"

#define LINE_LEN 16

int main() {
	return 0;
}

void RunCallback(const v8::FunctionCallbackInfo<Value>& args)
{
	Isolate* isolate = Isolate::GetCurrent();
	v8::HandleScope scope(isolate);

	Local<Function> callback = Local<Function>::Cast(args[1]);
	//const unsigned argc = 1;
	//Local<Value> argv[argc] = { String::NewFromUtf8(isolate, "This actually fucking works and builds with WPCAP.") };

	if (!args[0]->IsNumber()) {
		isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "The first parameter has to be a valid interface number")));
		return;
	}


	// callback->Call(isolate->GetCurrentContext()->Global(), argc, argv);

	pcap_if_t *alldevs, *d;
	pcap_t *fp;
	u_int inum, i = 0;
	char errbuf[PCAP_ERRBUF_SIZE];
	int res;
	struct pcap_pkthdr *header;
	const u_char *pkt_data;

	inum = args[0]->NumberValue();


	// get the list of all devices
	if (pcap_findalldevs_ex((char*) PCAP_SRC_IF_STRING, NULL, &alldevs, errbuf) == -1)
	{
		fprintf(stderr, "Error in pcap_findalldevs_ex: %s\n", errbuf);
		return;
	}

	// find the selected device
	for (d = alldevs, i = 0; i< inum - 1; d = d->next, i++);

	/* Open the device */
	if ((fp = pcap_open(d->name,
		100 /*snaplen*/,
		PCAP_OPENFLAG_PROMISCUOUS /*flags*/,
		20 /*read timeout*/,
		NULL /* remote authentication */,
		errbuf)
		) == NULL)
	{
		fprintf(stderr, "\nError opening adapter\n");
		return;
	}

	/* Read the packets */
	while ((res = pcap_next_ex(fp, &header, &pkt_data)) >= 0)
	{

		if (res == 0)
			/* Timeout elapsed */
			continue;

		/* print pkt timestamp and pkt len */
		// printf("%ld:%ld (%ld)\n", header->ts.tv_sec, header->ts.tv_usec, header->len);

		const unsigned argc = 2;
		Local<Value> argv[argc] = { Number::New(isolate, header->caplen), Nan::NewBuffer((char*) pkt_data, header->caplen).ToLocalChecked() };

		callback->Call(isolate->GetCurrentContext()->Global(), argc, argv);
	}

	if (res == -1)
	{
		fprintf(stderr, "Error reading the packets: %s\n", pcap_geterr(fp));
		return;
	}
}

void SetDevicesData(Isolate* isolate, const v8::FunctionCallbackInfo<Value>& args, std::vector<Device>& devices)
{
	Local<Array> resultArray = Array::New(isolate);

	for (int i = 0; i < devices.size(); i++)
	{
		Local<Object> object = Object::New(isolate);
		Device device = devices[i];

		object->Set(String::NewFromUtf8(isolate, "Name"), String::NewFromUtf8(isolate, device.DeviceName.c_str()));
		object->Set(String::NewFromUtf8(isolate, "Description"), String::NewFromUtf8(isolate, device.DeviceDescription.c_str()));
		object->Set(String::NewFromUtf8(isolate, "ID"), Number::New(isolate, device.DeviceID));

		resultArray->Set(i, object);
	}

	args.GetReturnValue().Set(resultArray);
}

void ListDevices(const v8::FunctionCallbackInfo<Value>& args) {
	std::vector<Device> devices;

	int i = 0;
	pcap_if_t *alldevs, *d;
	char errbuf[PCAP_ERRBUF_SIZE];

	Isolate* isolate = Isolate::GetCurrent();

	if (pcap_findalldevs_ex((char*) PCAP_SRC_IF_STRING, NULL, &alldevs, errbuf) == -1)
	{
		fprintf(stderr, "Error in pcap_findalldevs_ex: %s\n", errbuf);
		return;
	}

	/* Print the list */
	for (d = alldevs; d; d = d->next)
	{
		Device device;

		device.DeviceID = ++i;
		if (d->description)
			device.DeviceDescription = std::string(d->description);
		else
			device.DeviceDescription = std::string("(No description available)");

		device.DeviceName = std::string(d->name);

		devices.push_back(device);
	}

	SetDevicesData(isolate, args, devices);
}

void Init(Handle<Object> exports) {
	NODE_SET_METHOD(exports, "runCallback", RunCallback);
	NODE_SET_METHOD(exports, "listDevices", ListDevices);
}

NODE_MODULE(addon, Init);