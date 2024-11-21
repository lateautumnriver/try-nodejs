/**
 * Promiseインスタンスの状態遷移
 * Promiseインスタンスはsettled（fulfilled or rejected）状態になったらそれ以降は状態が変化しないことを確認する。
 * ポイント）
 * 1. Promiseの現在の状態を確認する方法を知っていること。
 * 2. Promiseをpending状態で生成する方法を知っていること。
 * 3. Promiseの状態をfulfilledにする方法を知っていること。
 * 4. Promiseの状態をrejectedにする方法を知っていること。
 */
const jp = require('../promise/json_parser')

// TODO: from here.
