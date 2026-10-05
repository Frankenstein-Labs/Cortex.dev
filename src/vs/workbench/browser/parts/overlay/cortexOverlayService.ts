/* eslint-disable header/header */

import {
	registerSingleton,
	InstantiationType,
} from "../../../../platform/instantiation/common/extensions.js";
import { Disposable, IDisposable } from "../../../../base/common/lifecycle.js";
import { CortexOverlayPart } from "./cortexOverlayPart.js";
import {
	createDecorator,
	IInstantiationService,
} from "../../../../platform/instantiation/common/instantiation.js";
import { IEditorService } from "../../../../workbench/services/editor/common/editorService.js";
import { ITerminalService } from "../../../../workbench/contrib/terminal/browser/terminal.js";
import { CommandsRegistry } from "../../../../platform/commands/common/commands.js";

export const ICortexOverlayService = createDecorator<ICortexOverlayService>(
	"pearaiOverlayService",
);

export interface ICortexOverlayService extends IDisposable {
	readonly _serviceBrand: undefined;

	/**
	 * Returns the CortexOverlayPart instance.
	 */
	readonly cortexOverlayPart: CortexOverlayPart;

	/**
	 * Shows the PearAI popup.
	 */
	show(): void;

	/**
	 * Hides the PearAI popup.
	 */
	hide(): void;

	/**
	 * Toggles the visibility of the PearAI popup.
	 */
	toggle(): void;

	/**
	 * Returns true if the PearAI popup is visible.
	 */
	isVisible(): boolean;

	/**
	 * Locks the PearAI popup.
	 */
	lock(): void;

	/**
	 * Unlocks the PearAI popup.
	 */
	unlock(): void;

	/**
	 * Returns true if the PearAI popup is locked.
	 */
	isLocked(): boolean;

	/**
	 * Hides the loading overlay message.
	 */
	hideOverlayLoadingMessage(): void;

	postMessageToWebview(msg: any): Promise<boolean>;
}

export class CortexOverlayService
	extends Disposable
	implements ICortexOverlayService
{
	declare readonly _serviceBrand: undefined;

	private readonly _cortexOverlayPart: CortexOverlayPart;

	constructor(
		@IInstantiationService
		private readonly instantiationService: IInstantiationService,
		@IEditorService private readonly _editorService: IEditorService,
		@ITerminalService private readonly _terminalService: ITerminalService,
		// @ICommandService private readonly commandService: ICommandService,
	) {
		super();
		this._cortexOverlayPart =
			this.instantiationService.createInstance(CortexOverlayPart);
		this.registerListeners();
		this.registerCommands();
	}

	private registerListeners(): void {
		this._register(
			this._editorService.onDidActiveEditorChange(() => {
				this.hide();
			}),
		);

		this._register(
			this._terminalService.onDidFocusInstance(() => {
				this.hide();
			}),
		);
	}

	private registerCommands(): void {
		// Register commands for external use e.g. in pearai submodule
		CommandsRegistry.registerCommand("pearai.isOverlayVisible", (accessor) => {
			const overlayService = accessor.get(ICortexOverlayService);
			return overlayService.isVisible();
		});

		CommandsRegistry.registerCommand("pearai.showOverlay", (accessor) => {
			const overlayService = accessor.get(ICortexOverlayService);
			overlayService.show();
		});

		CommandsRegistry.registerCommand("pearai.showOverlay.feedback", (accessor) => {
			const overlayService = accessor.get(ICortexOverlayService);
			overlayService.show();
			overlayService.postMessageToWebview({
				destination: "settings",
				messageType: "tab",
				messageId: "1",
				payload: {
					tab: "creator-feedback"
				}
			});
		});

		CommandsRegistry.registerCommand("pearai.hideOverlay", (accessor) => {
			const overlayService = accessor.get(ICortexOverlayService);
			overlayService.hide();
		});

		CommandsRegistry.registerCommand("pearai.toggleOverlay", (accessor) => {
			const overlayService = accessor.get(ICortexOverlayService);
			overlayService.toggle();
		});

		CommandsRegistry.registerCommand("pearai.lockOverlay", (accessor) => {
			const overlayService = accessor.get(ICortexOverlayService);
			overlayService.lock();
		});

		CommandsRegistry.registerCommand("pearai.unlockOverlay", (accessor) => {
			const overlayService = accessor.get(ICortexOverlayService);
			overlayService.unlock();
		});

		CommandsRegistry.registerCommand("pearai.isOverlayLocked", (accessor) => {
			const overlayService = accessor.get(ICortexOverlayService);
			return overlayService.isLocked();
		});

		CommandsRegistry.registerCommand("pearai.hideOverlayLoadingMessage", (accessor) => {
			const overlayService = accessor.get(ICortexOverlayService);
			overlayService.hideOverlayLoadingMessage();
		});
	}

	get cortexOverlayPart(): CortexOverlayPart {
		return this._cortexOverlayPart;
	}

	show(): void {
		this._cortexOverlayPart.show();
	}

	hide(): void {
		this._cortexOverlayPart.hide();
	}

	hideOverlayLoadingMessage(): void {
		this._cortexOverlayPart.hideOverlayLoadingMessage();
	}

	toggle(): void {
		this._cortexOverlayPart.toggle();
	}

	lock(): void {
		this._cortexOverlayPart.lock();
	}

	unlock(): void {
		this._cortexOverlayPart.unlock();
	}

	isLocked(): boolean {
		return this._cortexOverlayPart.isLocked;
	}

	override dispose(): void {
		super.dispose();
		this._cortexOverlayPart.dispose();
	}

	isVisible(): boolean {
		return this._cortexOverlayPart.isVisible();
	}

	postMessageToWebview(msg: { messageType: string, payload: any, messageId?: string}): Promise<boolean> {
		return this._cortexOverlayPart.postMessageToWebview(msg);
	}
}

registerSingleton(
	ICortexOverlayService,
	CortexOverlayService,
	InstantiationType.Eager,
);
