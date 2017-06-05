const NODE0 = "http://163.152.161.119:12321";
const NODE1 = "http://163.152.161.102:12321";
const ISANYWHERE = 0x00000000000000000000000000000000000000;
const ISANYTIME = 99999999;

   
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(NODE0));
const giftcardContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"originalValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"minter","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isTransferable","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"}],"name":"send","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"currentValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_ageMin","type":"uint8"},{"name":"_ageMax","type":"uint8"},{"name":"_isForMale","type":"bool"},{"name":"_isForFemale","type":"bool"},{"name":"_shopID","type":"address"},{"name":"_time","type":"uint256"},{"name":"_dateMin","type":"uint256"},{"name":"_dateMax","type":"uint256"}],"name":"setCondition","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"condition","outputs":[{"name":"ageMin","type":"uint8"},{"name":"ageMax","type":"uint8"},{"name":"isForMale","type":"bool"},{"name":"isForFemale","type":"bool"},{"name":"shopID","type":"address"},{"name":"time","type":"uint256"},{"name":"dateMin","type":"uint256"},{"name":"dateMax","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_input","type":"uint256"}],"name":"changeValue","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_value","type":"uint256"},{"name":"_isTransferable","type":"bool"}],"payable":false,"type":"constructor"}]);
var giftcard;

window.onload = function() {
	connectNode();
	document.getElementById('newContract').innerHTML = "현재 발급된 상품권이 없습니다."
	document.getElementById('minter').innerHTML = '발급자: ';
	document.getElementById('owner').innerHTML = '소유자: ';
	document.getElementById('originalValue').innerHTML = '발행된 금액: ';
	document.getElementById('currentValue').innerHTML = '현재의 금액: ';
	document.getElementById('transferable').innerHTML = '소유권 이전 가능: ';
	document.getElementById('conditionAge').innerHTML = '나이 제한: ';
	document.getElementById('conditionSex').innerHTML = '성별 제한: ';
	document.getElementById('conditionTarget').innerHTML = '사용가능 대상: ';
	document.getElementById('conditionHour').innerHTML = '사용가능 시간: ';
	document.getElementById('conditionDate').innerHTML = '사용가능 날짜: ';
};

function connectNode() {
	var node = document.getElementById('node0').checked ? NODE0 : NODE1;
	web3.setProvider(new web3.providers.HttpProvider(node));
	var balance = web3.eth.getBalance(web3.eth.coinbase).toNumber();
	var balance2 = web3.eth.getBalance(web3.personal.listAccounts[1]).toNumber();	
	document.getElementById('ip').innerHTML = 'IP: ' + node;
	document.getElementById('coinbase').innerHTML = 'Coinbase: ' + web3.eth.coinbase;
	document.getElementById('balance').innerHTML = 'Balance: ' + balance;
	document.getElementById('secondAccount').innerHTML = 'Second Account: ' + web3.personal.listAccounts[1];
	document.getElementById('balance2').innerHTML = 'Balance: ' + balance2;
	web3.eth.filter('latest').watch(function() {
		balance = web3.eth.getBalance(web3.eth.coinbase).toNumber();
		document.getElementById('balance').innerText = 'Balance: ' + balance;
	});
	var today = new Date().toISOString().split('T');
	document.getElementById('dateMin').value = today[0];
	document.getElementById('dateMax').value = today[0];
	web3.eth.defaultAccount = web3.eth.coinbase;
}

function createContract() {
	var _value = Number(document.getElementById('value').value) ;
	var _isTransferable = document.getElementById('isTransferable').checked ;
	var _pw = document.getElementById('crPw').value;
	try {
		web3.personal.unlockAccount(web3.eth.coinbase, _pw);	
	
		//submit to network
		console.log('start: ' + Number(new Date()));
		var giftcard = giftcardContract.new(
			_value,
			_isTransferable,
			{
			 from: web3.eth.accounts[0], 
			 data: '0x6060604052600060025560006003556001600460006101000a81548160ff02191690831515021790555061010060405190810160405280600060ff16815260200160ff60ff168152602001600115158152602001600115158152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016305f5e0ff8152602001630133c70581526020016305f5e0ff815250600560008201518160000160006101000a81548160ff021916908360ff16021790555060208201518160000160016101000a81548160ff021916908360ff16021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff02191690831515021790555060808201518160000160046101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a0820151816001015560c0820151816002015560e082015181600301555050341561018857fe5b604051604080610bb0833981016040528080519060200190919080519060200190919050505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550816002819055508160038190555080600460006101000a81548160ff0219169083151502179055505b50505b6109458061026b6000396000f300606060405236156100a2576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063052aa7e1146100a457806307546172146100ca5780632121dc751461011c5780633e58c58c14610146578063698996f81461017c57806383197ef0146101a25780638da5cb5b146101b45780639496a9f514610206578063c503133114610285578063f965e32e1461031c575bfe5b34156100ac57fe5b6100b461033c565b6040518082815260200191505060405180910390f35b34156100d257fe5b6100da610342565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561012457fe5b61012c610368565b604051808215151515815260200191505060405180910390f35b341561014e57fe5b61017a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061037b565b005b341561018457fe5b61018c610528565b6040518082815260200191505060405180910390f35b34156101aa57fe5b6101b261052e565b005b34156101bc57fe5b6101c46105a6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561020e57fe5b610283600480803560ff1690602001909190803560ff169060200190919080351515906020019091908035151590602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919080359060200190919080359060200190919050506105cc565b005b341561028d57fe5b610295610815565b604051808960ff1660ff1681526020018860ff1660ff16815260200187151515158152602001861515151581526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018381526020018281526020019850505050505050505060405180910390f35b341561032457fe5b61033a600480803590602001909190505061089f565b005b60025481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600460009054906101000a900460ff1681565b3373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156103d85760006000fd5b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156104145760006000fd5b600460009054906101000a900460ff168061047c57503373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b806104d75750600560000160049054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b15156104e35760006000fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b60035481565b3373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561058b5760006000fd5b3073ffffffffffffffffffffffffffffffffffffffff16ff5b565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156106295760006000fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156106a85760006000fd5b600460009054906101000a900460ff1615156106c357600093505b610100604051908101604052808960ff1681526020018860ff168152602001871515815260200186151581526020018573ffffffffffffffffffffffffffffffffffffffff16815260200184815260200183815260200182815250600560008201518160000160006101000a81548160ff021916908360ff16021790555060208201518160000160016101000a81548160ff021916908360ff16021790555060408201518160000160026101000a81548160ff02191690831515021790555060608201518160000160036101000a81548160ff02191690831515021790555060808201518160000160046101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a0820151816001015560c0820151816002015560e082015181600301559050505b5050505050505050565b60058060000160009054906101000a900460ff16908060000160019054906101000a900460ff16908060000160029054906101000a900460ff16908060000160039054906101000a900460ff16908060000160049054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154905088565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156108fc5760006000fd5b600254811015151561090e5760006000fd5b806003819055505b505600a165627a7a7230582050081442fb446f133cc08dc3b80f80c9578a1c53dd8f751cf6c3dff23ad042740029', 
			 gas: '4700000'
			},
			function (e, contract){
				console.log(e, contract);
				if (typeof contract.address !== 'undefined') {
					console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
					console.log('end: ' + Number(new Date()));
					alert('새 상품권이 발급되었습니다!: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
					 
					document.getElementById('newContract').innerHTML = giftcard.address;
					document.getElementById('inquery').innerHTML = giftcard.address;
				}
			}
		);
	}
	catch(err) {		
		alert('패스워드가 올바르지 않습니다!');
	}
	
}

function disableButtons(isDisabled) {
	document.getElementById('bt_scUnlock').disabled = isDisabled;
	document.getElementById('bt_cvUnlock').disabled = isDisabled;
	document.getElementById('bt_trUnlock').disabled = isDisabled;
	document.getElementById('bt_dsUnlock').disabled = isDisabled;	
}

function findContract() {
	updateContract();
	web3.eth.filter('latest').watch(function () {
		updateContract();
	});
}

function updateContract() {	
	disableButtons(true);
	var address = document.getElementById('inquery').value;
	if (web3.eth.getCode(address).length < 3) {
		alert('상품권이 존재하지 않습니다!');
		document.getElementById('minter').innerHTML = '발급자: ';
		document.getElementById('owner').innerHTML = '소유자: ';
		document.getElementById('originalValue').innerHTML = '발행된 금액: ';
		document.getElementById('currentValue').innerHTML = '현재의 금액: ';
		document.getElementById('transferable').innerHTML = '소유권 이전 가능: ';
		document.getElementById('conditionAge').innerHTML = '나이 제한: ';
		document.getElementById('conditionSex').innerHTML = '성별 제한: ';
		document.getElementById('conditionTarget').innerHTML = '사용가능 대상: ';
		document.getElementById('conditionHour').innerHTML = '사용가능 시간: ';
		document.getElementById('conditionDate').innerHTML = '사용가능 날짜: ';
		return;
	}
	giftcard = giftcardContract.at(address);
	disableButtons(false);
	
	document.getElementById('minter').innerHTML = '발급자: ' + giftcard.minter();
	document.getElementById('owner').innerHTML = '소유자: ' + giftcard.owner();
	document.getElementById('originalValue').innerHTML = '발행된 금액: ' + giftcard.originalValue();
	document.getElementById('currentValue').innerHTML = '현재의 금액: ' + giftcard.currentValue();
	document.getElementById('transferable').innerHTML = '소유권 이전 가능: ' + (giftcard.isTransferable() ? "가능" : "불가능");
	
	var conditions = giftcard.condition();
	
	document.getElementById('conditionAge').innerHTML = '나이 제한: ' + conditions[0] + ' ~ ' + conditions[1];
	var condition_sex = conditions[2]? (conditions[3]? '없음': '남자만 사용가능') : '여자만 사용가능';
	document.getElementById('conditionSex').innerHTML = '성별 제한: ' + condition_sex;
	
	var condition_target = (conditions[4] == ISANYWHERE)? "제한 없음 (어디서나 가능합니다)" : conditions[4];
	document.getElementById('conditionTarget').innerHTML = '사용가능 대상: ' + condition_target;
	
	var time_array = (Number(conditions[5]) + 100000000).toString().substr(1).match(/.{1,2}/g);		//prevent error of early parts with 0s
	var condition_time = (Number(conditions[5]) == ISANYTIME) ? "제한 없음 (언제나 가능합니다)" : time_array[0] + ':' + time_array[1] + ' ~ ' + time_array[2] + ':' + time_array[3];
	document.getElementById('conditionHour').innerHTML = '사용가능 시간: ' + condition_time;
	var dateMin_array = (Number(conditions[6]) + 100000000).toString().substr(1).match(/.{1,2}/g);		//prevent error of early parts with 0s
	var dateMax_array = (Number(conditions[7]) + 100000000).toString().substr(1).match(/.{1,2}/g);		//prevent error of early parts with 0s
	var condition_data = dateMin_array[0] + dateMin_array[1] + '-' + dateMin_array[2] + '-' + dateMin_array[3]
	+ ' ~ ' + dateMax_array[0] + dateMax_array[1] + '-' + dateMax_array[2] + '-' + dateMax_array[3];
	document.getElementById('conditionDate').innerHTML = '사용가능 날짜: ' + condition_data;
	
}

function unlockSC() {
	var pw = document.getElementById('scPw').value;
	if (giftcard.minter() == giftcard.owner() && giftcard.minter() == web3.eth.coinbase) {
		try {
			web3.personal.unlockAccount(web3.eth.coinbase, pw);
			document.getElementById('bt_set').disabled = false;
		}
		catch(err) {
			alert('패스워드가 올바르지 않습니다!');
		}
	}
	else {
		alert('조건 설정은 발급자만 가능합니다!');
	}
}

function setCondition() {
	if (giftcard.minter() != web3.eth.coinbase) {
		alert('조건 설정은 발급자만 가능합니다!');
		return;
	}
	else if(giftcard.owner() != web3.eth.coinbase) {
		alert('조건 설정은 발급자와 소유자가 일치할 때만 가능합니다!');
		return;
	}	
		
	var pw = document.getElementById('scPw').value;
	var ageMin = document.getElementById('ageMin').value;
	var ageMax = document.getElementById('ageMax').value;
	if (Number(ageMin) > Number(ageMax)) {
		alert('나이의 범위가 올바르지 않습니다!');
		return;
	}
	var isForMale = document.getElementById('isForMale').checked;
	var isForFemale = document.getElementById('isForFemale').checked;
	if (!(isForMale || isForFemale)) {
		alert('최소 하나의 성별은 선택되어야 합니다!');
		return;		
	}
	var shopID = document.getElementById('isForAll').checked ? ISANYWHERE : document.getElementById('shopID').value;
	
	var valTimeMin = document.getElementById('timeMin').value.toString();
	var valTimeMax = document.getElementById('timeMax').value.toString();
	var valDateMin = document.getElementById('dateMin').value.toString();
	var valDateMax = document.getElementById('dateMax').value.toString();
	
	if (valTimeMin == "" || valTimeMax == "" || valDateMin == "" || valDateMax == "") {
		alert('시간이나 날짜가 올바르지 않습니다!');
		return;
	}
	
	var timeMin = Number(valTimeMin.replace(/:/g, ""));
	var timeMax = Number(valTimeMax.replace(/:/g, ""));
	var timeRange = document.getElementById('isAnytime').checked ? ISANYTIME : (timeMin * 10000 + timeMax);
	var dateMin = Number(valDateMin.replace(/-/g, ""));
	var dateMax = Number(valDateMax.replace(/-/g, ""));
	
	if (dateMin > dateMax) {
		alert('날짜의 범위가 올바르지 않습니다!');
		return;
	}
		
	giftcard.setCondition(ageMin, ageMax, isForMale, isForFemale, shopID, timeRange, dateMin, dateMax);
	document.getElementById('bt_set').disabled = true;
	alert("제출 완료! 몇번의 승인 후에 적용됩니다.");
}


function unlockCV() {
	var pw = document.getElementById('cvPw').value;
	
	if (giftcard.minter() == web3.eth.coinbase) {
		try {
			web3.personal.unlockAccount(web3.eth.coinbase, pw);
			document.getElementById('bt_change').disabled = false;
		}
		catch(err) {
			alert('패스워드가 올바르지 않습니다!');
		}
	}
	else {
		alert('가치 조절은 발급자만 가능합니다!');
	}
}

function changeGCValue() {
	if (giftcard.minter() != web3.eth.coinbase) {
		alert('가치 조절은 발급자만 가능합니다!');
		return;
	}
	
	var value = Number(document.getElementById('newValue').value);
	if (value < Number(giftcard.originalValue())) {
		alert('발행된 금액보다 작을 수 없습니다!');
		return;
	}
	
	var pw = document.getElementById('cvPw').value;
	
	web3.personal.unlockAccount(web3.eth.coinbase, pw);
	giftcard.changeValue(value);
	document.getElementById('bt_change').disabled = true;
	alert("제츌 완료! 몇번의 승인 후에 적용됩니다.");
}

function unlockTransfer() {
	var pw = document.getElementById('txPw').value;
	
	if (giftcard.owner() == web3.eth.coinbase) {
		try {
			web3.personal.unlockAccount(web3.eth.coinbase, pw);
			document.getElementById('bt_transfer').disabled = false;
		}
		catch(err) {
			alert('패스워드가 올바르지 않습니다!');
		}
	}
	else {
		alert('소유자만 소유권 이전이 가능합니다!');
	}
}

function transfer() {	
	if(giftcard.owner() != web3.eth.coinbase) {
		alert('소유자만 소유권 이전이 가능합니다!');
		return;
	}
	var receiver = document.getElementById('txReceiver').value;
	
	if (giftcard.owner() == receiver) {
		alert('자기 자신에게 이전은 불가능합니다!');
		return;
	}
	
	else if (giftcard.isTransferable() || giftcard.minter() == web3.eth.coinbase || receiver == giftcard.condition()[4]){	
		giftcard.send(receiver);
		document.getElementById('bt_transfer').disabled = true;
		alert(receiver + "에게 소유권이 이전 됩니다!");
	}
	else {
		alert('이 상품권은 소유권 이전이 불가능합니다!');
		return;
	}
}

function unlockDestroy() {
	var pw = document.getElementById('dsPw').value;
	
	if (giftcard.owner() == web3.eth.coinbase) {
		try {
			web3.personal.unlockAccount(web3.eth.coinbase, pw);
			document.getElementById('bt_destroy').disabled = false;
		}
		catch(err) {
			alert('패스워드가 올바르지 않습니다!');
		}
	}
	else {
		alert('환불은 소유자만 가능합니다!');
	}
}

function destroy() {
	if(giftcard.owner() != web3.eth.coinbase) {
		alert('환불은 소유자만 가능합니다!');
		return;
	}
	giftcard.destroy();
	document.getElementById('bt_destroy').disabled = true;
	alert("환불이 신청되었습니다! 이 상품권은 더이상 유효하지 않습니다.");
}