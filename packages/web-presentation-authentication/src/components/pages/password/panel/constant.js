import * as Messages from '../../../../Messages.json';

export const settingPasswordData = {
    checkEnabled: 'checkEnabled',
    minLength: 'minLength',
    maxLength: 'maxLength',
    numberOfDifferentCharacters: 'numberOfDifferentCharacters',
    allowedIsActive: 'allowedIsActive',
    requiredIsActive: 'requiredIsActive',
    specialCharsets: 'specialCharsets'

};

export const tableCategoryData = {
    figures: 'figures',
    lowercaseLatin: 'lowercaseLatin',
    uppercaseLatin: 'uppercaseLatin',
    specCharacters: 'specCharacters'
};
export const fieldsPasswordSetting = [
    {key: settingPasswordData.checkEnabled, name: Messages.PasswordPanel.fields.checkEnabled},
    {key: settingPasswordData.minLength, name: Messages.PasswordPanel.fields.minLength},
    {key: settingPasswordData.maxLength, name: Messages.PasswordPanel.fields.maxLength},
    {key: settingPasswordData.numberOfDifferentCharacters, name: Messages.PasswordPanel.fields.numberOfDifferentCharacters},
    {key: settingPasswordData.specialCharsets, name: Messages.PasswordPanel.fields.specialCharsets}
];

export const columnBodyCategory = [
    {key: tableCategoryData.figures, name: Messages.PasswordPanel.categoryData.figures, type: 'DIGIT'},
    {key: tableCategoryData.lowercaseLatin, name: Messages.PasswordPanel.categoryData.lowercaseLatin, type: 'LOWERCASE_LATIN'},
    {key: tableCategoryData.uppercaseLatin, name: Messages.PasswordPanel.categoryData.uppercaseLatin, type: 'UPPERCASE_LATIN'},
    {key: tableCategoryData.specCharacters, name: Messages.PasswordPanel.categoryData.specCharacters, type: 'SPECIAL'}
];

export const columnHeadCategory = [
    {key: "groupSymbols", name: Messages.PasswordPanel.groupSymbols},
    {key: "allowed", name: Messages.PasswordPanel.allowed},
    {key: "required", name: Messages.PasswordPanel.required},
];