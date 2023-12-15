export const masks = {
    regexpOnlyCyrillicHyphenSpace: /^[А-Яа-яёЁ\-\s]+$/,
    regexpEmail: /^(((\w+-)|(\w+\.))*\w+@(\w+\.)+[a-zA-Z]{2,6})$/,
    regexpMobilePhone: /^\+7 \(\d\d\d\) \d\d\d-\d\d-\d\d$/
};

export const numberFormat = (value) => {
    if (value.charAt(4) === '8' && value.charAt(5) === '8') {
        value = value.slice(0, 5) + value.slice(6, value.length);
    }
    if (value.charAt(4) === '7') {
        value = value.slice(0, 4) + value.slice(5, value.length);
    }
    return value;
};