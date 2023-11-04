import { toNano } from 'ton-core';
import { Telemint } from '../wrappers/Collection';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const telemint = provider.open(
        Telemint.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('Telemint')
        )
    );

    await telemint.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(telemint.address);

    console.log('ID', await telemint.getID());
}
