import prisma from "@/lib/db";
async function main() {
  return "Successfully populated database!";
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

//   {
//     "username" : "miracledestiny",
//     "password" : "abc",
//     "email" : "miracle@gmail.com",
//     "name" : "miracle",
//     "profile" : {
//         "bio" : "crazy",
//         "location" : "Bangkok",
//         "dateOfBirth" : "1995-08-15T00:00:00Z"
//     }
// }
