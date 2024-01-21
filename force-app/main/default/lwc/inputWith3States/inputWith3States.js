/**
 * @author Sean Lee
 * @date 2024-01-20
 * @description This is an LWC component where input has three states.
 */
import { LightningElement, track } from "lwc";

const PROGRAMMING_LANGUAGES = ["JAVA", "C#", "PYTHON", "C"];
export default class InputWith3States extends LightningElement {
    checked = false;
    @track selectedCheckboxes = [];
    programmingLanguages = PROGRAMMING_LANGUAGES.reduce(
        (varSoFar, lang) => [
            ...varSoFar,
            {
                label: lang,
                value: lang
            }
        ],
        []
    );

    handleSelectUnselectAll(event) {
        let { target } = event || {},
            { checked } = target || {};
        this.checked = !!checked;
        if (this.checked) {
            this.programmingLanguages.forEach(({ value }) => {
                if (!this.selectedCheckboxes.includes(value)) {
                    this.selectedCheckboxes = [
                        ...this.selectedCheckboxes,
                        value
                    ];
                }
            });
        } else {
            this.selectedCheckboxes = [];
        }
    }

    handleCheckboxGroupChange(event) {
        let { detail } = event || {},
            { value } = detail || {};
        this.selectedCheckboxes = value;
        this.checked = this.selectedCheckboxes.length !== 0;
        this.template.querySelectorAll("input").forEach((inputElement) => {
            inputElement.indeterminate =
                this.selectedCheckboxes.length !==
                    this.programmingLanguages.length &&
                this.selectedCheckboxes.length !== 0;
        });
    }
}
