export default class PacketFilter {

	compTargetIP = null;
	compSourceIP = null;
	compProtocol = null;
	compMinLength = null;
	compMaxLength = null;

	constructor(filterExpression) {
		this.filterExpression = filterExpression;
		this._parseFilterExpression(this.filterExpression);
	}

	_parseFilterExpression() {
		const tokens = this.filterExpression.split(" ");

		let currentToken = tokens.shift();
		while (tokens.length > 0) {
			switch (currentToken) {
				case "srcIP":
					this.compSourceIP = tokens.shift();
					break;
				case "tarIP":
					this.compTargetIP = tokens.shift();
					break;
				case "proto":
					this.compProtocol = tokens.shift();
					break;
				case "minLen": {
					const length = tokens.shift();
					if (!isNaN(length))
						this.compMinLength = parseInt(length);
					break;
				}
				case "maxLen": {
					const length = tokens.shift();
					if (!isNaN(length))
						this.compMaxLength = parseInt(length);
					break;
				}
			}

			currentToken = tokens.shift();
		}
	}

	filterPacketList(packets, displayCount) {
		const filterFunc = (packet) => {
			let protocol = packet.getProtocol();
			if (typeof protocol === "undefined")
				protocol = "";

			if (this.compMaxLength != null && packet.getLength() > this.compMaxLength)
				return false;
			else if (this.compMinLength != null && packet.getLength() < this.compMinLength)
				return false;
			else if (this.compSourceIP != null && packet.sourceIP !== this.compSourceIP)
				return false;
			else if (this.compTargetIP != null && packet.targetIP !== this.compTargetIP)
				return false;
			else if (this.compProtocol != null && protocol.indexOf(this.compProtocol) === -1)
				return false;
			else return true;
		};

		return packets.filter(filterFunc).slice(packets.length - displayCount, packets.length);
	}

}