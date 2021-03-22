import SadnessChanMod from "./module/SadnessChanMod";
import Settings from './module/Settings.js';

/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */
Hooks.once('init', async function() {
	console.log('sadness-chan-mod | Initializing sadness-chan-mod');

	// Register custom module settings
	Settings.registerSettings();
});


/* ------------------------------------ */
/* Render chat message							*/
/* ------------------------------------ */
Hooks.on('renderChatMessage', SadnessChanMod.renderChatMessageHook.bind(SadnessChanMod));
