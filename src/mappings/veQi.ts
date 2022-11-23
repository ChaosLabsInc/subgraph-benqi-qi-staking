import {Staked, Unstaked,} from "../../build/types/veQi/veQi";

import {StakedEvent, UnstakedEvent,} from "../../build/types/schema";
import {Address, log} from "@graphprotocol/graph-ts";
import {createAccountBalance, getAccount, getEventId} from "../helpers"

let veQiContractAddress = Address.fromString("0x7Ee65Fdc1C534A6b4f9ea2Cc3ca9aC8d6c602aBd")

export function handleStaked(event: Staked): void {

    // First, log the event
    let eventEntity = new StakedEvent(getEventId(event));
    eventEntity.timestamp = event.block.timestamp;
    eventEntity.blockNumber = event.block.number
    eventEntity.user = event.params.user;
    eventEntity.qiAmount = event.params.amount;
    eventEntity.save();

    log.debug('Staked Event: user {}, qiAmount {}', [event.params.user.toHexString(), eventEntity.qiAmount.toString()])

    let accountEntity = getAccount(event.params.user);
    accountEntity.balance = accountEntity.balance.plus(event.params.amount);
    accountEntity.save();
    createAccountBalance(event.block.timestamp, event.params.user, accountEntity.balance);

    let qiAccountEntity = getAccount(veQiContractAddress);
    log.info('veQiContractAddress {}', [veQiContractAddress.toHexString()]);
    qiAccountEntity.balance = qiAccountEntity.balance.plus(event.params.amount);
    qiAccountEntity.save();
    createAccountBalance(event.block.timestamp, veQiContractAddress, qiAccountEntity.balance);
}

export function handleUnstaked(event: Unstaked): void {

    // First, log the event
    let eventEntity = new UnstakedEvent(getEventId(event));
    eventEntity.timestamp = event.block.timestamp;
    eventEntity.blockNumber = event.block.number
    eventEntity.user = event.params.user;
    eventEntity.qiAmount = event.params.amount;
    eventEntity.save();

    log.debug('Unstaked Event: user {}, qiAmount {}', [event.params.user.toHexString(), eventEntity.qiAmount.toString()])

    let accountEntity = getAccount(event.params.user);
    accountEntity.balance = accountEntity.balance.minus(event.params.amount);
    accountEntity.save();
    createAccountBalance(event.block.timestamp, event.params.user, accountEntity.balance);

    let qiAccountEntity = getAccount(veQiContractAddress);
    log.info('veQiContractAddress {}', [veQiContractAddress.toHexString()]);
    qiAccountEntity.balance = qiAccountEntity.balance.minus(event.params.amount);
    qiAccountEntity.save();
    createAccountBalance(event.block.timestamp, veQiContractAddress, qiAccountEntity.balance);
}
