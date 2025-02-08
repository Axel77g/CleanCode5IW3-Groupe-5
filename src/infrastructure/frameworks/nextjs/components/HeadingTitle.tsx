export default function HeadingTile(props: { children: any }) {
    return <h1 className={'text-3xl font-semibold flex items-center gap-2'}>{props.children}</h1>
}