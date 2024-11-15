// import { NextRequest } from "next/server";

// export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
//   try {
//     const session = await getServerAuthSession();
//     console.log(session);
//     // if (params.userId !== session?.user.id && session?.user.role !== "Admin") {
//     //   return NextResponse.json(UNAUTHORIZED_ERROR, {
//     //     status: UNAUTHORIZED_ERROR.status,
//     //   });
//     // }

//     const rawSelect = parseSelect(req.nextUrl.searchParams.get("select"));
//     const select = getUserEventSelectZod.optional().parse(rawSelect);

//     const userEvents = await db.event.findMany({
//       where: {
//         eventParticipants: {
//           some: {
//             userId: params.userId,
//           },
//         },
//       },
//       select,
//     });
//     return NextResponse.json({ data: userEvents });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(BAD_REQUEST, { status: BAD_REQUEST.status });
//   }
// }
