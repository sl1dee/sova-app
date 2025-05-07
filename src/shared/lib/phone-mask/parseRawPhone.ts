export function parseRawPhone(rawPhone: string): string {
    if (!rawPhone) return '';

    const countryCode = rawPhone.length > 0 ? `+${rawPhone[0]}` : '';

    let phoneServiceCode = rawPhone.slice(1, 4);
    if (phoneServiceCode) {
        phoneServiceCode = ` (${phoneServiceCode}`;
        if (phoneServiceCode.length === 5) {
            phoneServiceCode += ')';
        }
    }

    let phoneOperatorCode = rawPhone.slice(4, 7);
    if (phoneOperatorCode) {
        phoneOperatorCode = ` ${phoneOperatorCode}`;
    }

    let phoneFirstBodyPart = rawPhone.slice(7, 9);
    if (phoneFirstBodyPart) {
        phoneFirstBodyPart = `-${phoneFirstBodyPart}`;
    }

    let phoneSecondBodyPart = rawPhone.slice(9, 11);
    if (phoneSecondBodyPart) {
        phoneSecondBodyPart = `-${phoneSecondBodyPart}`;
    }

    return `${countryCode}${phoneServiceCode}${phoneOperatorCode}${phoneFirstBodyPart}${phoneSecondBodyPart}`;
}
