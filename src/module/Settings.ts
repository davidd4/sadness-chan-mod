class Settings {

	public readonly sadnessModuleName: string = 'sadness-chan';
	public readonly moduleName: string = 'sadness-chan-mod';
	public readonly SETTING_KEYS = {
		COUNTER: 'counter',
		AVERAGE_TOGGLE: 'averageToggle',
	};

	private static _instance: Settings;

    private constructor() {
    }

    public static getInstance(): Settings {
        if (!Settings._instance) Settings._instance = new Settings();
        return Settings._instance;
    }

	public registerSettings(): void {
		// Register any custom module settings here
	}

    public getSadnessSetting(key: string): any {
        return this._getSetting(this.sadnessModuleName, key);
    }
	
    public getCounter(): any {
        const setting = this.getSadnessSetting(this.SETTING_KEYS.COUNTER);
        try {
            return JSON.parse(setting);
        } catch (error) {
            return {};
        }
    }

    private _getSetting(module: string,  key: string): any {
        return game.settings.get(module, key);
    }

}

export default Settings.getInstance();