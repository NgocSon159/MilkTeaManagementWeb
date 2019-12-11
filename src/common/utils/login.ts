export const login = (props: any, destinate: string) => {
    console.log('history', props);
    props && props.push(destinate);
}