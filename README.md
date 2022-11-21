# Halal Crypto Community Token

Hala Crypto Community is the community dedicated to empowering an ethics-first Shariah-compliant financial crypto ecosystem

# Run and deploy the token

Follow the below steps to run and deploy the token and Haqq network

## Install dependencies

```shell
yarn
or
npm install
```

## Create an .env file

create a **.env** file and file by looking onto **.env.example** file in the repo
and fill your **private key** of your haqq wallet and **etherscan api key** accordingly

> **Note**:-Make sure you have some ISLM in your wallet for gas fee

## Deploy the token in Haqq Network

Make sure that your account has enough ISLM for paying gas fee

Deploy the token on Haqq network by executing following command

```shell
npm run deploy
or
yarn run deploy
```

## Run Test

```shell
npm run test
or
yarn run test
```

# Description

HCC token is backed by Islamic coin in Haqq network.
People can mint HCC token by locking Islamic Coin
You can unlock your **Islamic Coin** by burning **HCC** token using our contract

## Functions

Describing all functions in the contract

### depoist

```shell
function deposit()  public  payable  {
	balanceOf[msg.sender]  +=  msg.value;
	emit Deposit(msg.sender,  msg.value);
}
```

This function will deposit lock **IslamicCoin** into our contract and issue **HCC**

### withdraw

```shell
function withdraw(uint islm)  public  {
	require(balanceOf[msg.sender]  >= islm);
	balanceOf[msg.sender]  -= islm;
	payable(msg.sender).transfer(islm);
	emit Withdrawal(msg.sender, islm);
}
```

Using this function you can burn your **HCC** token to get back your **IslamicCoin**

> **Note**:-Make sure you are withdrawing less or equal amount of **IslamicCoin** you are depositing

### totalSupply

```shell
function totalSupply()  public  view  returns  (uint)  {
	return  address(this).balance;
}
```

This is a view function. You can find **Total Supply** of **HCC** token in circulation or total amount **IslamicCoin** Locked

### approve

```shell
function approve(address guy,  uint islm)  public  returns  (bool)  {
	allowance[msg.sender][guy] = islm;
	emit Approval(msg.sender, guy, islm);
	return  true;
}
```

This method will allows a smart contract or another address to withdraw funds from the address sending the transaction

### transfer

```shell
function transfer(address dst,  uint islm)  public  returns  (bool)  {
	return transferFrom(msg.sender, dst, islm);
}
```

This function will allow people to send token to other peoples it is just actually calling the function **transferFrom**

### transferFrom

```shell
function transferFrom(address src,  address dst,  uint islm)
public
returns  (bool)
{
	require(balanceOf[src]  >= islm);
	if  (src !=  msg.sender && allowance[src][msg.sender]  !=  type(uint).max)  {
		require(allowance[src][msg.sender]  >= islm);
		allowance[src][msg.sender]  -= islm;
	}
	balanceOf[src]  -= islm;
	balanceOf[dst]  += islm;
	emit Transfer(src, dst, islm);
	return  true;
}
```

This is the main function that performing transfer functionality in the contract.

> **Note**:- You must need to make sure that the token you sending should be less than or equal to the token you are holding
