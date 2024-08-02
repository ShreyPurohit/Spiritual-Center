import '@testing-library/jest-dom'
import { makeUserName } from '../../lib/helpers/helperFunctions'

const usernameTestValidator = () => {
     test("should give 2024-sh-pu-6 on input ('2024-06-23','shrey','purohit')", () => {
          expect(makeUserName('2024-06-23', 'shrey', 'purohit')).toContain('2024-sh-pu-6')
     })
     test("shoud throw errors on empty params", () => {
          expect(makeUserName("", "", "")).toEqual(["Initiation Date Not Provided", "First Name Not Provided", "Last Name Not Provided"])
     })
     test("shoud throw errors on empty params (Initiation Date)", () => {
          expect(makeUserName("", "shrey", "purohit")).toEqual(["Initiation Date Not Provided"])
     })
     test("shoud throw errors on empty params (First Name)", () => {
          expect(makeUserName("2024-06-23", "", "purohit")).toEqual(["First Name Not Provided"])
     })
     test("shoud throw errors on empty params (Last Name)", () => {
          expect(makeUserName("2024-06-23", "shrey", "")).toEqual(["Last Name Not Provided"])
     })
}

usernameTestValidator()