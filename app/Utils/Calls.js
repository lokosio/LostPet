import call from 'react-native-phone-call'

export function makeCall(number){
    const args = {
        number: number, // String value with the number to call
        Prompt: false // Optional boolean property. Determines if the user should be Prompt prior to the call 
    }
   call(args).catch(console.error)
}