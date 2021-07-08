export async function getServerSideProps(context: any) {
  const res = await fetch(`https://api.github.com/users/mvil025`)
  console.log(res)
  return {
    user: res
  }
}