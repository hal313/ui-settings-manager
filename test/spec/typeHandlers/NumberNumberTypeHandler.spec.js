import { NumberNumberTypeHandler } from '../../../src/typeHandlers/NumberNumberTypeHandler';
import { Constants } from '../../../src/Constants';

// TODO: Test types (or cast to boolean)
// TODO: Handle bad cases (null element, etc)
describe('NumberNumberTypeHandler', () => {

    describe('Lifecycle', () => {

        test('should exist', () => {
            expect(NumberNumberTypeHandler).toBeDefined();
        });

    });

    describe('API', () => {
        let numberNumberTypeHandler;

        beforeEach(() => {
            numberNumberTypeHandler = new NumberNumberTypeHandler();
        });

        describe('createElement', () => {

            test('should throw when name is undefined', () => {
                expect(() => numberNumberTypeHandler.createElement(undefined, 101)).toThrow();
            });

            test('should throw when name is null', () => {
                expect(() => numberNumberTypeHandler.createElement(null, 101)).toThrow();
            });

            test('should throw when name is the empty string', () => {
                expect(() => numberNumberTypeHandler.createElement('', 101)).toThrow();
            });

            test('should throw when name is whitespace', () => {
                expect(() => numberNumberTypeHandler.createElement('   ', 101)).toThrow();
            });

            test('should create a number string input element', () => {
                const name = 'fieldName';
                const value = 101;

                // Create the element
                const element = numberNumberTypeHandler.createElement(name, value);

                // Check the type
                expect(element instanceof Element).toBeTruthy();
                // Check the required attributes
                expect(element.getAttribute(Constants.ATTRIBUTE_NAME)).toEqual(name);
                expect(element.getAttribute(Constants.ATTRIBUTE_TYPE)).toEqual(numberNumberTypeHandler.getType());
                // Check the value
                expect(+element.value).toEqual(value);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

        });

        describe('getValue', () => {

            test('should get the value from a self-created element', () => {
                const name = 'fieldName';
                const value = 101;

                // Create the element
                const element = numberNumberTypeHandler.createElement(name, value);

                // Check the value
                expect(numberNumberTypeHandler.getValue(element)).toEqual(value);
            });

        });

        describe('setValue', () => {

            test('should set the value for a self-created element', () => {
                const name = 'fieldName';
                const value = 101;

                // Create the element
                const element = numberNumberTypeHandler.createElement(name, value);

                // Precondition check
                expect(numberNumberTypeHandler.getValue(element)).toEqual(value);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();

                // Set the new value
                const newValue = (value + value + 1) * 2;
                numberNumberTypeHandler.setValue(element, newValue);

                // Check the new value
                expect(numberNumberTypeHandler.getValue(element)).toEqual(newValue);

                // Check the value
                expect(+element.value).toEqual(newValue);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

        });

    });

});