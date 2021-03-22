import Settings from "./Settings";

class SadnessChanMod {

    private static _instance: SadnessChanMod;

    private constructor() {
    }

    public static getInstance(): SadnessChanMod {
        if (!SadnessChanMod._instance) SadnessChanMod._instance = new SadnessChanMod();
        return SadnessChanMod._instance;
    }

    public renderChatMessageHook(message: ChatMessage, html: JQuery, data: any): void { 
        let statsWrapper = html.find(".sadness-chan-chat-stats");
        if (!statsWrapper.length) return;

        console.log('rerendering sadness stats');

        let counter = Settings.getCounter();

        statsWrapper.find(".sadness-chan-chat-stats-body").each((index, statsBody) => {
            let userName = $(statsBody).find("h2.sadness-chan-chat-stats-body__username").text();
            const userData = Object.values(counter).find((userCounter: any) => userCounter.name == userName);
            if (!userData) return;

            let newHtml = this._getStatsMessageBody(userData);
            $(statsBody).html(newHtml);
        });
    }

    private _getStatsMessageBody(userData: any): string {
        const statsClass = `${Settings.sadnessModuleName}-chat-stats`;
        const statsBodyClass = `${statsClass}-body`;
        const modStatsClass = `${Settings.moduleName}-chat-stats`;
        const modStatsBodyClass = `${modStatsClass}-body`;

        let message = `<h2 class="${statsBodyClass}__username">${userData.name}</h2>`;

        const rolls = userData.rolls;
        if (rolls) {
            const rollsClass = `${statsBodyClass}__rolls`;
            const modRollsClass = `${modStatsBodyClass}__rolls`;
            const rollClass = `${rollsClass}-roll`;
            const calcRollDie = () => {
                const calcStats = this._getCalcStats(rolls);
                return `<li class="${rollClass}">
                    <span class="${rollClass}-dice avg"><span>${calcStats.average}</span></span>    
                    <span class="${rollClass}-count">avg / ${calcStats.numberOfRolls}</span>    
                </li>`
            };

            // const deviationRollDie = () => {
            //     const deviationNumber = this._getDeviation(rolls);
            //     return `<li class="${rollClass}">
            //         <span class="${rollClass}-dice dev"><span>${deviationNumber}</span></span>    
            //         <span class="${rollClass}-count">dev</span>    
            //     </li>`
            // };

            message += `<ol class="${rollsClass} ${modRollsClass}">`;
            for (let i = 1; i < rolls.length; i++) {
                message += `<li class="${rollClass}">
                    <span class="${rollClass}-dice ${(i == 1 ? 'min' : (i == rolls.length - 1 ? 'max' : ''))}">${i}</span>    
                    <span class="${rollClass}-count">${rolls[i]}</span>    
                </li>`; 
            }
            message += `</ol>`;

            message += `<ol class="${rollsClass} calc">`;
            message += `${calcRollDie()}`;
            //message += `${deviationRollDie()}`;
            message += `</ol>`;
        }

        return message;
    }

    private _getCalcStats(rolls: Array<number>): { numberOfRolls: number; average: number } {
        let rollsTotal = 0;
        let numberOfRolls = 0;
        for (let i = 0; i < rolls.length; i++) {
            rollsTotal += i * rolls[i];
            numberOfRolls += rolls[i];
        }
        let average = this._roundUp(rollsTotal / numberOfRolls) || 0;
        return {
            numberOfRolls: numberOfRolls,
            average: average
        };
    }

    // private _getDeviation(rolls: Array<number>): number {
    //     let avarage = this._getAverage(rolls);
    //     let deviationsTotal = 0;
    //     let numberOfRolls = 0;
    //     for (let i = 1; i < rolls.length; i++) {
    //         deviationsTotal += rolls[i] * Math.pow(i - avarage, 2);
    //         numberOfRolls += rolls[i];
    //     }
    //     let variance = (deviationsTotal / numberOfRolls) || 0;
    //     return this._roundUp(Math.sqrt(variance));
    // }

    private _roundUp(nr: number): number {
        return Math.round((nr + Number.EPSILON) * 10) / 10;
    }


}

export default SadnessChanMod.getInstance();