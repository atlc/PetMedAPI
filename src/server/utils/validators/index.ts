const isTruthy = (val: unknown) => !!val;
const isDefined = (val: unknown) => typeof val !== "undefined";
const isArray = (val: unknown) => Array.isArray(val);
const isString = (val: unknown) => typeof val === "string";
const isTooShort = ({ string, min = 1 }: StringCheck) => string.length <= min;
const isTooLong = ({ string, max }: StringCheck) => string.length >= max!;

interface StringCheck {
    string: string;
    max?: number;
    min?: number;
}

export const hasBadStrings = (vals: StringCheck[]) => {
    return vals.some(({ string, min = 1, max }) => {
        return !isString(string) || isTooShort({ string, min }) || isTooLong({ string, max });
    });
};
