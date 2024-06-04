import Link from "next/link";
import { BackArrowSVG } from "~/components/icons";
import { Button } from "~/components/ui/button";
// import { deleteMyImage, getMyImage } from "~/server/queries";

export default async function TaskModal({
  params: { id: taskId },
}: {
  params: { id: string };
}) {
  //   const numImgId = Number(imgId);
  //   if (isNaN(numImgId)) throw new Error("Invalid image id");

  //   const image = await getMyImage(numImgId);

  return (
    <div className="flex flex-row gap-4 p-4">
      <Link href="/calendar">
        <BackArrowSVG />
      </Link>
      <div className="flex flex-col gap-4">
        {/* <h1 className="text-3xl font-bold">{image.name}</h1>
        {imgId}
        <img src={image.url} className="w-48" />
        <p>Created at: {image.createdAt.toString()}</p> */}
        hello world
        {/* <form
          action={async () => {
            "use server";
            await deleteMyImage(numImgId);
          }}
        > */}
        <Button variant="destructive" type="submit" className="w-[100px]">
          Delete
        </Button>
        {/* </form> */}
      </div>
    </div>
  );
}
