/* eslint-disable prefer-const */ // to satisfy AS compiler

import {Address, BigInt, Bytes, ethereum, log} from "@graphprotocol/graph-ts";
import {Account, AccountBalance} from "../build/types/schema";


export function getEventId(event: ethereum.Event): string {
    return event.transaction.hash
        .toHexString()
        .concat("-")
        .concat(event.transactionLogIndex.toString());
}


/**
 * Create an account balance entity
 * @param timestamp {BigInt} block timestamp
 * @param user {Address} user wallet address
 * @param balance {BigInt} user balance
 */
export function createAccountBalance(timestamp: BigInt, user: Bytes, balance: BigInt = new BigInt(0)): AccountBalance {
    let id = user
        .toHexString()
        .concat("-")
        .concat(timestamp.toString());
    let accountBalance = new AccountBalance(id);
    accountBalance.timestamp = timestamp
    accountBalance.user = user
    accountBalance.balance = balance;
    accountBalance.save();
    return accountBalance;
}

/**
 * Creates an account with zero balance
 * @param user {Address} user wallet address
 */
export function createAccount(user: Address): Account {
    let accountID = user.toHex();
    let account = new Account(accountID);
    account.balance = new BigInt(0);
    account.user = user;
    account.save();
    return account;
}


/**
 * Get a user account, create with zero balance if ot doesn't exist
 * @param user {Address} user wallet address
 */
export function getAccount(user: Address): Account {
    let accountID = user.toHex();
    log.debug('Account ID: {}', [accountID])
    let account = Account.load(accountID);
    if (account == null) {
        log.debug('Creating account: {}', [accountID])
        account = createAccount(user);
    }
    return <Account>account;
}