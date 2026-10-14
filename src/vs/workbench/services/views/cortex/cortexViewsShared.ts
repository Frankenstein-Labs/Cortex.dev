/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export type CortexView = 'chat' | 'agent' | 'search' | 'memory';

export const CortexChatExtensionId = 'workbench.view.extension.pearaiChat';
export const CortexSearchExtensionId = 'workbench.view.extension.pearaiSearch';
export const CortexMemoryExtensionId = 'workbench.view.extension.pearaiMemory';
export const CortexAgentExtensionId = 'workbench.view.extension.cortex-agent';

export const CORTEX_VIEWS = {
	chat: CortexChatExtensionId,
	agent: CortexAgentExtensionId,
	search: CortexSearchExtensionId,
	memory: CortexMemoryExtensionId
} as const;

export const auxiliaryBarAllowedViewContainerIDs = ['workbench.view.extension.pearai', 'workbench.view.extension.cortex-agent', 'workbench.views.service.auxiliarybar'];
// auxiliary bar here is needed because additional views created by our integrations look like: workbench.views.service.auxiliarybar.c01af9cf-6360-4e6a-a725-4dfd9832755c
