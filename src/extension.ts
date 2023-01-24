import {ExtensionContext, TextDocument, workspace, window} from 'vscode';
// nvm it means child process not child po
import {exec} from 'child_process';

let assetsPath:string = "";

let lastSaveTime:number = 0;
let lastAudioTime:number = 0;
let dateTime = new Date();

export function activate(context: ExtensionContext) {
	assetsPath = context.asAbsolutePath("./assets/");

	workspace.onDidSaveTextDocument((document: TextDocument) => {
		dateTime = new Date();
		if (lastSaveTime === 0) {
			lastSaveTime = dateTime.getTime();
			return;
		}
		const saveInterval = dateTime.getTime() - lastSaveTime;
		const audioInterval = dateTime.getTime() - lastAudioTime;
		if (saveInterval < 1000 && audioInterval > 2000) {
			exec('"' + assetsPath + 'sounder.exe" ' + assetsPath + "postalSave" + Math.random().toFixed() + ".wav");
			lastAudioTime = dateTime.getTime();
		}
		lastSaveTime = dateTime.getTime();
	});
}
