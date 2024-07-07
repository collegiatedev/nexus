import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed data for Task model
  await prisma.task.create({
    data: {
      name: "disintermediate global e-commerce",
      description: "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      dueDate: new Date("2024-05-24T23:32:39Z"),
      done: false,
      assigned: "bchillistone0",
      taskTags: {
        create: [{ type: "Exam" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "enable leading-edge infomediaries",
      description: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
      dueDate: new Date("2024-08-31T03:00:10Z"),
      done: true,
      assigned: "jloblie1",
      taskTags: {
        create: [{ type: "Logistics" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "visualize efficient e-markets",
      description: "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
      dueDate: new Date("2024-09-06T14:54:09Z"),
      done: false,
      assigned: "odecarolis2",
      taskTags: {
        create: [{ type: "Meeting" }, { type: "Deadline" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "facilitate revolutionary eyeballs",
      description: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      dueDate: new Date("2024-07-09T22:21:21Z"),
      done: true,
      assigned: "jwainscot3",
      taskTags: {
        create: [{ type: "Essays" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "aggregate synergistic paradigms",
      description: "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
      dueDate: new Date("2024-09-21T17:41:24Z"),
      done: true,
      assigned: "afransinelli4",
      taskTags: {
        create: [{ type: "Essays" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "drive world-class solutions",
      description: "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
      dueDate: new Date("2024-05-24T08:19:49Z"),
      done: true,
      assigned: "norwin5",
      taskTags: {
        create: [{ type: "Logistics" }, { type: "Exam" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "integrate efficient experiences",
      description: "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
      dueDate: new Date("2024-07-04T05:47:15Z"),
      done: true,
      assigned: "tworsalls6",
      taskTags: {
        create: [{ type: "Activity" }, { type: "Logistics" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "benchmark compelling web services",
      description: "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
      dueDate: new Date("2024-05-02T07:02:09Z"),
      done: true,
      assigned: "bbrewett7",
      taskTags: {
        create: [{ type: "Deadline" }],
      },
    },
  });


  await prisma.task.create({
    data: {
      name: "disintermediate end-to-end communities",
      description: "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
      dueDate: new Date("2024-05-11T20:55:25Z"),
      done: true,
      assigned: "rpessoltb",
      taskTags: {
        create: [{ type: "Exam" }, { type: "Essays" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "deploy web-enabled functionalities",
      description: "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
      dueDate: new Date("2024-08-16T09:08:12Z"),
      done: true,
      assigned: "cgulk9",
      taskTags: {
        create: [],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "repurpose killer action-items",
      description: "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
      dueDate: new Date("2024-09-08T21:09:30Z"),
      done: false,
      assigned: "rduigenana",
      taskTags: {
        create: [],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "revolutionize granular experiences",
      description: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
      dueDate: new Date("2024-09-07T04:42:08Z"),
      done: true,
      assigned: "afishpoolec",
      taskTags: {
        create: [],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "revolutionize 24/7 architectures",
      description: "Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
      dueDate: new Date("2024-08-03T13:07:59Z"),
      done: true,
      assigned: "gonthankd",
      taskTags: {
        create: [],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "unleash sexy functionalities",
      description: "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
      dueDate: new Date("2024-05-19T02:07:14Z"),
      done: false,
      assigned: "jlavendere",
      taskTags: {
        create: [],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "brand e-business e-tailers",
      description: "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
      dueDate: new Date("2024-06-03T14:20:52Z"),
      done: false,
      assigned: "ewhellansf",
      taskTags: {
        create: [{ type: "Meeting" }, { type: "School" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "grow real-time experiences",
      description: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
      dueDate: new Date("2024-08-13T10:28:44Z"),
      done: false,
      assigned: "fslowlyg",
      taskTags: {
        create: [{ type: "Exam" }, { type: "Deadline" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "seize cross-platform functionalities",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
      dueDate: new Date("2024-06-17T13:11:04Z"),
      done: true,
      assigned: "hstittleh",
      taskTags: {
        create: [],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "transition efficient experiences",
      description: "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      dueDate: new Date("2024-06-26T18:05:41Z"),
      done: true,
      assigned: "jcurriei",
      taskTags: {
        create: [],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "visualize front-end web services",
      description: "Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
      dueDate: new Date("2024-05-11T09:34:56Z"),
      done: false,
      assigned: "ahallgarthj",
      taskTags: {
        create: [{ type: "Essays" }, { type: "Deadline" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "scale sexy technologies",
      description: "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
      dueDate: new Date("2024-07-09T22:14:59Z"),
      done: false,
      assigned: "tgilcristk",
      taskTags: {
        create: [{ type: "Deadline" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "incentivize leading-edge markets",
      description: "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
      dueDate: new Date("2024-05-19T08:26:18Z"),
      done: true,
      assigned: "vokennedyl",
      taskTags: {
        create: [{ type: "Exam" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "expedite global supply-chains",
      description: "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
      dueDate: new Date("2024-07-09T12:31:03Z"),
      done: false,
      assigned: "lbouettem",
      taskTags: {
        create: [{ type: "Activity" }, { type: "Exam" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "morph killer e-business",
      description: "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
      dueDate: new Date("2024-09-29T07:28:49Z"),
      done: false,
      assigned: "wscoginn",
      taskTags: {
        create: [],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "integrate scalable schemas",
      description: "In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
      dueDate: new Date("2024-08-23T06:36:19Z"),
      done: false,
      assigned: "nhovieo",
      taskTags: {
        create: [],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "transform wireless bandwidth",
      description: "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
      dueDate: new Date("2024-06-05T08:54:32Z"),
      done: false,
      assigned: "clansdalep",
      taskTags: {
        create: [],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "drive mission-critical infrastructures",
      description: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
      dueDate: new Date("2024-07-23T22:04:53Z"),
      done: true,
      assigned: "togriffinq",
      taskTags: {
        create: [],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "incubate magnetic eyeballs",
      description: "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus.",
      dueDate: new Date("2024-07-07T11:08:18Z"),
      done: true,
      assigned: "llabelr",
      taskTags: {
        create: [{ type: "Project" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "productize holistic action-items",
      description: "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui.",
      dueDate: new Date("2024-07-19T05:59:05Z"),
      done: false,
      assigned: "dhemberys",
      taskTags: {
        create: [{ type: "Exam" }, { type: "Logistics" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "enable 24/7 users",
      description: "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
      dueDate: new Date("2024-06-30T18:13:57Z"),
      done: false,
      assigned: "asollarst",
      taskTags: {
        create: [{ type: "Meeting" }],
      },
    },
  });

  await prisma.task.create({
    data: {
      name: "synthesize innovative schemas",
      description: "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
      dueDate: new Date("2024-09-29T22:18:08Z"),
      done: true,
      assigned: "ibauchopu",
      taskTags: {
        create: [{ type: "Essays" }, { type: "Meeting" }],
      },
    },
  });

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
