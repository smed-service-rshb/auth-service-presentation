import React from 'react';

import TestHelper from '@efr/medservice-react-test'
import FileUpload from './index';

const name = "name";

describe('FileUpload', () => {
    describe('Test render', () => {
        test('Check the FileUpload was rendered  => Control is render', () => {
            let fileupload = TestHelper.render(<FileUpload dataId="fileUpload1" name={name}/>);

            expect(fileupload.hasClass('upload-container')).toEqual(true);
            expect(fileupload.hasClass('disabled')).toEqual(false);
        });
        test('Check FileUpload identifier', () => {
            const fileUploadId = "fileUpload1";
            let fileupload = TestHelper.render(<FileUpload dataId={fileUploadId} name={name}/>);

            expect(fileupload.find('input').prop('data-id')).toEqual(fileUploadId);
        });
        test('Control have name attribute => Control render with name', () => {
            const fileUploadId = "fileUpload1";
            let fileupload = TestHelper.render(<FileUpload dataId={fileUploadId} name={name}/>);

            expect(fileupload.find('.upload-button').text()).toEqual(name);
        });
        test('Control have disabled attribute => Control will be disabled', () => {
            const fileUploadId = "fileUpload1";
            let fileupload = TestHelper.render(<FileUpload dataId={fileUploadId} name={name} disabled/>);

            expect(fileupload.hasClass('disabled')).toEqual(true);
        });
        test('Check tabIndex value ', () => {
            const fileUploadId = "fileUpload1";
            const tabIndex = 2;
            let fileupload = TestHelper.render(<FileUpload dataId={fileUploadId} name={name} disabled tabIndex={tabIndex}/>);

            expect(fileupload.find('.upload-button').getDOMNode().tabIndex).toEqual(tabIndex);
        });
    });
});