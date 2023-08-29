import {BaseContract, EventLog, Log} from "ethers";
import {ethers} from "hardhat";
import {Address} from "./types";

export async function deployContract<T extends BaseContract>(name: string, args: any[] = []): Promise<T> {
    const contract = (await ethers.deployContract(name, args)) as T
    await contract.waitForDeployment()
    return contract
}

export async function attachContract<T extends BaseContract>(name: string, address: Address): Promise<T> {
    const contractFactory = await ethers.getContractFactory("Account")
    return contractFactory.attach(address) as T
}

export function findEvent(
    name: string,
    events: Array<EventLog | Log> | undefined
): EventLog | null {
    if (!events) {
        return null
    }

    const event = events
        .find((event) => {
            return event instanceof EventLog && event.eventName === name
        })

    if (!event) {
        return null
    }

    return event as EventLog
}