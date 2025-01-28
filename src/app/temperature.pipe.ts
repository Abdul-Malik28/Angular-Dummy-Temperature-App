import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temp',
    standalone: true
})
export class TemperaturePipe implements PipeTransform {
    transform(value: string | number | null, inputType: 'cel' | 'fah', outputType?: 'cel' | 'fah') {

        if (!value) {
            return value;
        }

        let val: number;
        if (typeof value === 'string') {
            val = parseFloat(value);
        } else {
            val = value;
        }

        let outputTemp: number;

        if (inputType === 'cel' && outputType === 'fah') {
            outputTemp = val * (9 / 5) + 32;        //  C to F
        } else if (inputType === 'fah' && outputType === 'cel') {
            outputTemp = (val - 32) * (5 / 9);      //  F to C
        } else {
            outputTemp = val;       //  F = F or C = C
        }

        let symbol: '°C' | '°F';

        if (!outputType) {
            symbol = inputType === 'cel' ? '°C' : '°F';
        } else {
            symbol = outputType === 'cel' ? '°C' : '°F';
        }

        return `${outputTemp.toFixed(2)} ${symbol}`;
    }
}