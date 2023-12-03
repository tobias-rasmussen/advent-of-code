import * as fs from 'fs';

if (require.main === module) {
    main();
}

function main() {
    console.time('Time');
    const words = fs.readFileSync('./day-1-trebuchet/day-1-input.txt', 'utf-8');
    const wordsArray = words.split('\r\n');
    const result = getTotalCalibrationValue(wordsArray);
    console.log('Sum of all calibration values: ', result);
    const modifiedResult = getTotalModifiedCalibrationValue(wordsArray);
    console.log('Sum of all modified calibration values: ', modifiedResult);

    console.log(`Used ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
    console.timeEnd('Time');
}

export function getTotalCalibrationValue(input: string[]): number {
    let result = 0;
    input.forEach(element => {
        result += getCalibrationValue(element)
    });
    return result;
}

export function getCalibrationValue(input: string): number {
    let firstDigit: string = '';
    let lastDigit: string = '';
    for (let i=0; i < input.length; i++) {
        const char = input.charAt(i);
        if (!char.match('[0-9]')) continue;
        if (firstDigit == '') {
            firstDigit = char;
        }
        lastDigit = char;
    }
    return parseInt(firstDigit + lastDigit); 
}

export function getTotalModifiedCalibrationValue(input: string[]): number {
    let result = 0;
    input.forEach(element => {
        result += getModifiedCalibrationValue(element)
    });
    return result;
}

export function getModifiedCalibrationValue(input: string): number {
    const modifiedInput = modifyInput(input);
    let firstDigit: string = '';
    let lastDigit: string = '';
    for (let i=0; i < modifiedInput.length; i++) {
        const char = modifiedInput.charAt(i);
        if (!char.match('[0-9]')) continue;
        if (firstDigit == '') {
            firstDigit = char;
        }
        lastDigit = char;
    }
    return parseInt(firstDigit + lastDigit); 
}

function modifyInput(input: string) {
    let result = input;
    const regex = /one|two|three|four|five|six|seven|eight|nine/
    let matches = result.match(regex);
    while (matches) {
        const nextMatchIdx = result.indexOf(matches[0]);
        result = result.slice(0, nextMatchIdx) + mapWordToNumber(matches[0]) + result.slice(nextMatchIdx + 1);
        matches = result.match(regex);
    }
    return result;
}

function mapWordToNumber(input: string): string {
    switch (input) {
        case 'one': return '1';
        case 'two': return '2';
        case 'three': return '3';
        case 'four': return '4';
        case 'five': return '5';
        case 'six': return '6';
        case 'seven': return '7';
        case 'eight': return '8';
        case 'nine': return '9';
        default: throw new Error('Invalid input: ' + input);
    }
}