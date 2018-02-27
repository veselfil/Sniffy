const ETHERNET_HEADER_LENGTH = 14;

const PROTOCOL_TCP = 1;
const PROTOCOL_UDP = 2;

const SOURCE_PORT = 1;
const DEST_PORT = 2;

/**
 * Contains all layer 4 protocols defined in the IPv4 protocol.
 * @type {*[]}
 */
const L2_PROTOCOL_MAP = [ { "ethertype": "", "protocol": "" }, {
  "ethertype": "0x0800",
  "protocol": "IPv4 (Internet Protocol version 4)"
}, { "ethertype": "0x0806", "protocol": "Address Resolution Protocol (ARP)" }, {
  "ethertype": "0x0842",
  "protocol": "Wake on LAN[3]"
}, { "ethertype": "0x22F3", "protocol": "IETF TRILL Protocol" }, {
  "ethertype": "0x6003",
  "protocol": "DECnet Fáze IV"
}, { "ethertype": "0x8035", "protocol": "Reverse Address Resolution Protocol" }, {
  "ethertype": "0x809B",
  "protocol": "AppleTalk (Ethertalk)"
}, { "ethertype": "0x80F3", "protocol": "AppleTalk Address Resolution Protocol (AARP)" }, {
  "ethertype": "0x8100",
  "protocol": "VLAN-taggované rámce (IEEE 802.1Q) & Shortest Path Bridging IEEE 802.1aq[4]"
}, { "ethertype": "0x8137", "protocol": "IPX" }, { "ethertype": "0x8138", "protocol": "IPX" }, {
  "ethertype": "0x8204",
  "protocol": "QNX Qnet"
}, { "ethertype": "0x86DD", "protocol": "IPv6 (Internet Protocol Version 6)" }, {
  "ethertype": "0x8808",
  "protocol": "Ethernet flow control"
}, { "ethertype": "0x8809", "protocol": "Protokoly Slow (IEEE 802.3)" }, {
  "ethertype": "0x8819",
  "protocol": "CobraNet"
}, { "ethertype": "0x8847", "protocol": "MPLS unicast" }, {
  "ethertype": "0x8848",
  "protocol": "MPLS multicast"
}, { "ethertype": "0x8863", "protocol": "PPPoE Discovery Stage" }, {
  "ethertype": "0x8864",
  "protocol": "PPPoE Session Stage"
}, { "ethertype": "0x8870", "protocol": "Jumbo Frames[2]" }, {
  "ethertype": "0x887B",
  "protocol": "HomePlug 1.0 MME"
}, { "ethertype": "0x888E", "protocol": "EAP over LAN (IEEE 802.1X)" }, {
  "ethertype": "0x8892",
  "protocol": "PROFINET Protocol"
}, { "ethertype": "0x889A", "protocol": "HyperSCSI (SCSI over Ethernet)" }, {
  "ethertype": "0x88A2",
  "protocol": "ATA over Ethernet"
}, { "ethertype": "0x88A4", "protocol": "EtherCAT Protocol" }, {
  "ethertype": "0x88A8",
  "protocol": "Provider Bridging (IEEE 802.1ad) & Shortest Path Bridging IEEE 802.1aq[5]"
}, { "ethertype": "0x88AB", "protocol": "Ethernet Powerlink" }, {
  "ethertype": "0x88CC",
  "protocol": "Link Layer Discovery Protocol (LLDP)"
}, { "ethertype": "0x88CD", "protocol": "SERCOS III" }, { "ethertype": "0x88E1", "protocol": "HomePlug AV MME" }, {
  "ethertype": "0x88E3",
  "protocol": "Media Redundancy Protocol (IEC62439-2)"
}, { "ethertype": "0x88E5", "protocol": "MAC Security (IEEE 802.1AE)" }, {
  "ethertype": "0x88F7",
  "protocol": "Precision Time Protocol (PTP) over Ethernet (IEEE 1588)"
}, {
  "ethertype": "0x8902",
  "protocol": "IEEE 802.1ag Connectivity Fault Management (CFM) Protocol / doporučení ITU-T Y.1731 (OAM)"
}, { "ethertype": "0x8906", "protocol": "Fibre Channel over Ethernet (FCoE)" }, {
  "ethertype": "0x8914",
  "protocol": "FCoE Initialization Protocol"
}, { "ethertype": "0x8915", "protocol": "RDMA over Converged Ethernet (RoCE)" }, {
  "ethertype": "0x892F",
  "protocol": "High-availability Seamless Redundancy (HSR)"
}, { "ethertype": "0x9000", "protocol": "Ethernet Configuration Testing Protocol[6]" }, {
  "ethertype": "0x9100",
  "protocol": "Q-in-Q"
}, { "ethertype": "0xCAFE", "protocol": "Veritas Low Latency Transport (LLT)[7] pro Veritas Cluster Server" } ]

const L3_PROTOCOL_MAP = [ { number: '0', proto: 'HOPOPT' }, { number: '1', proto: 'ICMP' }, {
  number: '2',
  proto: 'IGMP'
}, { number: '3', proto: 'GGP' }, { number: '4', proto: 'IP-in-IP' }, { number: '5', proto: 'ST' }, {
  number: '6',
  proto: 'TCP'
}, { number: '7', proto: 'CBT' }, { number: '8', proto: 'EGP' }, { number: '9', proto: 'IGP' }, {
  number: '10',
  proto: 'BBN-RCC-MON'
}, { number: '11', proto: 'NVP-II' }, { number: '12', proto: 'PUP' }, { number: '13', proto: 'ARGUS' }, {
  number: '14',
  proto: 'EMCON'
}, { number: '15', proto: 'XNET' }, { number: '16', proto: 'CHAOS' }, { number: '17', proto: 'UDP' }, {
  number: '18',
  proto: 'MUX'
}, { number: '19', proto: 'DCN-MEAS' }, { number: '20', proto: 'HMP' }, { number: '21', proto: 'PRM' }, {
  number: '22',
  proto: 'XNS-IDP'
}, { number: '23', proto: 'TRUNK-1' }, { number: '24', proto: 'TRUNK-2' }, { number: '25', proto: 'LEAF-1' }, {
  number: '26',
  proto: 'LEAF-2'
}, { number: '27', proto: 'RDP' }, { number: '28', proto: 'IRTP' }, { number: '29', proto: 'ISO-TP4' }, {
  number: '30',
  proto: 'NETBLT'
}, { number: '31', proto: 'MFE-NSP' }, { number: '32', proto: 'MERIT-INP' }, { number: '33', proto: 'DCCP' }, {
  number: '34',
  proto: '3PC'
}, { number: '35', proto: 'IDPR' }, { number: '36', proto: 'XTP' }, { number: '37', proto: 'DDP' }, {
  number: '38',
  proto: 'IDPR-CMTP'
}, { number: '39', proto: 'TP++' }, { number: '40', proto: 'IL' }, { number: '41', proto: 'IPv6' }, {
  number: '42',
  proto: 'SDRP'
}, { number: '43', proto: 'IPv6-Route' }, { number: '44', proto: 'IPv6-Frag' }, {
  number: '45',
  proto: 'IDRP'
}, { number: '46', proto: 'RSVP' }, { number: '47', proto: 'GREs' }, { number: '48', proto: 'DSR' }, {
  number: '49',
  proto: 'BNA'
}, { number: '50', proto: 'ESP' }, { number: '51', proto: 'AH' }, { number: '52', proto: 'I-NLSP' }, {
  number: '53',
  proto: 'SWIPE'
}, { number: '54', proto: 'NARP' }, { number: '55', proto: 'MOBILE' }, { number: '56', proto: 'TLSP' }, {
  number: '57',
  proto: 'SKIP'
}, { number: '58', proto: 'IPv6-ICMP' }, { number: '59', proto: 'IPv6-NoNxt' }, {
  number: '60',
  proto: 'IPv6-Opts'
}, { number: '61', proto: '' }, { number: '62', proto: 'CFTP' }, { number: '63', proto: '' }, {
  number: '64',
  proto: 'SAT-EXPAK'
}, { number: '65', proto: 'KRYPTOLAN' }, { number: '66', proto: 'RVD' }, { number: '67', proto: 'IPPC' }, {
  number: '68',
  proto: ''
}, { number: '69', proto: 'SAT-MON' }, { number: '70', proto: 'VISA' }, { number: '71', proto: 'IPCU' }, {
  number: '72',
  proto: 'CPNX'
}, { number: '73', proto: 'CPHB' }, { number: '74', proto: 'WSN' }, { number: '75', proto: 'PVP' }, {
  number: '76',
  proto: 'BR-SAT-MON'
}, { number: '77', proto: 'SUN-ND' }, { number: '78', proto: 'WB-MON' }, { number: '79', proto: 'WB-EXPAK' }, {
  number: '80',
  proto: 'ISO-IP'
}, { number: '81', proto: 'VMTP' }, { number: '82', proto: 'SECURE-VMTP' }, { number: '83', proto: 'VINES' }, {
  number: '84',
  proto: 'TTP'
}, { number: '84', proto: 'IPTM' }, { number: '85', proto: 'NSFNET-IGP' }, { number: '86', proto: 'DGP' }, {
  number: '87',
  proto: 'TCF'
}, { number: '88', proto: 'EIGRP' }, { number: '89', proto: 'OSPF' }, { number: '90', proto: 'Sprite-RPC' }, {
  number: '91',
  proto: 'LARP'
}, { number: '92', proto: 'MTP' }, { number: '93', proto: 'AX.25' }, { number: '94', proto: 'OS' }, {
  number: '95',
  proto: 'MICP'
}, { number: '96', proto: 'SCC-SP' }, { number: '97', proto: 'ETHERIP' }, { number: '98', proto: 'ENCAP' }, {
  number: '99',
  proto: ''
}, { number: '100', proto: 'GMTP' }, { number: '101', proto: 'IFMP' }, { number: '102', proto: 'PNNI' }, {
  number: '103',
  proto: 'PIM'
}, { number: '104', proto: 'ARIS' }, { number: '105', proto: 'SCPS' }, { number: '106', proto: 'QNX' }, {
  number: '107',
  proto: 'A/N'
}, { number: '108', proto: 'IPComp' }, { number: '109', proto: 'SNP' }, {
  number: '110',
  proto: 'Compaq-Peer'
}, { number: '111', proto: 'IPX-in-IP' }, { number: '112', proto: 'VRRP' }, { number: '113', proto: 'PGM' }, {
  number: '114',
  proto: ''
}, { number: '115', proto: 'L2TP' }, { number: '116', proto: 'DDX' }, { number: '117', proto: 'IATP' }, {
  number: '118',
  proto: 'STP'
}, { number: '119', proto: 'SRP' }, { number: '120', proto: 'UTI' }, { number: '121', proto: 'SMP' }, {
  number: '122',
  proto: 'SM'
}, { number: '123', proto: 'PTP' }, { number: '124', proto: 'IS-IS over IPv4' }, {
  number: '125',
  proto: 'FIRE'
}, { number: '126', proto: 'CRTP' }, { number: '127', proto: 'CRUDP' }, { number: '128', proto: 'SSCOPMCE' }, {
  number: '129',
  proto: 'IPLT'
}, { number: '130', proto: 'SPS' }, { number: '131', proto: 'PIPE' }, { number: '132', proto: 'SCTP' }, {
  number: '133',
  proto: 'FC'
}, { number: '134', proto: 'RSVP-E2E-IGNORE' }, { number: '135', proto: 'Mobility Header' }, {
  number: '136',
  proto: 'UDPLite'
}, { number: '137', proto: 'MPLS-in-IP' }, { number: '138', proto: 'manet' }, { number: '139', proto: 'HIP' }, {
  number: '140',
  proto: 'Shim6'
}, { number: '141', proto: 'WESP' }, { number: '142', proto: 'ROHC' }, {
  number: '143-252',
  proto: 'UNASSIGNED'
}, { number: '253-254', proto: 'Use for experimentation and testing' }, {
  number: '255',
  proto: 'Reserved for extra.'
} ];

export { L3_PROTOCOL_MAP, L2_PROTOCOL_MAP, ETHERNET_HEADER_LENGTH, PROTOCOL_TCP, PROTOCOL_UDP, DEST_PORT, SOURCE_PORT };
