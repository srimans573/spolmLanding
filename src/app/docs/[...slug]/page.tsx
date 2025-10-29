export default async function Yeet({params,}:{
    params: Promise<{slug: string[]}>
})
{
    const {slug} = (await params);

    return <p style={{color:"white"}}>{slug[0] + slug[1] + slug[2]}</p>
}