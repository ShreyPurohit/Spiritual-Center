import { generateMessageCSS } from "@/lib/helpers/helperFunctions";

describe('generateMessageCSS', () => {
    it('should return the correct CSS class for ADMIN', () => {
        expect(generateMessageCSS('ADMIN', 'someUser')).toBe('self-center px-6 py-3 rounded border border-black text-gray-200 gap-3 m-1');
    });

    it('should return the correct CSS class for self message', () => {
        expect(generateMessageCSS('user123', 'user123')).toBe('self-end px-6 py-3 rounded-md bg-blue-300 max-w-xs lg:max-w-md text-gray-200 gap-3 m-1');
    });

    it('should return the correct CSS class for other user message', () => {
        expect(generateMessageCSS('otherUser', 'user123')).toBe('self-start px-6 py-3 rounded-md bg-gray-300 max-w-xs lg:max-w-md text-gray-200 gap-3 m-1');
    });
});