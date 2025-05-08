export function getRawPhoneFromParsedPhone(
    parsedPhone: string,
    prevParsedPhone: string
): string {
    if (prevParsedPhone.includes(')') && !parsedPhone.includes(')') && parsedPhone.includes('(')) {
        parsedPhone = parsedPhone.slice(0, -1);
    }

    const pureValue = parsedPhone.replace(/\D/g, '');

    const phoneExitCode = pureValue.slice(0, 1);
    const phoneServiceCode = pureValue.slice(1, 4);
    const phoneOperatorCode = pureValue.slice(4, 7);
    const phoneFirstBodyPart = pureValue.slice(7, 9);
    const phoneSecondBodyPart = pureValue.slice(9, 11);

    return `${phoneExitCode}${phoneServiceCode}${phoneOperatorCode}${phoneFirstBodyPart}${phoneSecondBodyPart}`;
}
