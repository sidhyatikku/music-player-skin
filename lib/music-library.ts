export interface Song {
  id: string // YouTube video ID
  title: string
  duration?: string
}

export interface Album {
  name: string
  year?: string
  songs: Song[]
  coverUrl?: string
}

export interface Artist {
  name: string
  albums: Album[]
  photoUrl?: string
}

export const musicLibrary: Artist[] = [
  {
    name: "AC/DC",
    photoUrl: "https://coverartarchive.org/release/ddee5911-8a13-41e6-88db-6534a5f4fc46/front",
    albums: [
      {
        name: "High Voltage",
        year: "1975",
        coverUrl: "https://coverartarchive.org/release/ddee5911-8a13-41e6-88db-6534a5f4fc46/front",
        songs: [
          { id: "ClvRgZjBCvo", title: "Baby, Please Don't Go" },
          { id: "C46fNXNMhOc", title: "She's Got Balls" },
          { id: "QzFZpRaWLO4", title: "Little Lover" },
          { id: "BY_LumPgM3g", title: "Stick Around" },
          { id: "Sn6bfNFUSU0", title: "Soul Stripper" },
          { id: "qIec8a1Dvus", title: "You Ain't Got a Hold on Me" },
          { id: "vkSTIslDEc4", title: "Love Song" },
          { id: "C_RH-D1Wj2Q", title: "Show Business" },
        ],
      },
      {
        name: "T.N.T.",
        year: "1975",
        coverUrl: "https://coverartarchive.org/release/c0f84466-6d72-45bc-8333-34f89b2c8eb5/front",
        songs: [
          { id: "4ruJ4kAGbLc", title: "It's a Long Way to the Top (If You Wanna Rock 'n' Roll)" },
          { id: "xxqCEPBDZxk", title: "Rock 'n' Roll Singer" },
          { id: "kq_GSIw0X0w", title: "The Jack" },
          { id: "6tdiMdj164w", title: "Live Wire" },
          { id: "NhsK5WExrnE", title: "T.N.T." },
          { id: "JlmtJd0dWqo", title: "Rocker" },
          { id: "9gbMzhe_Wgc", title: "Can I Sit Next to You Girl" },
          { id: "9P7xwGI4eRA", title: "High Voltage" },
          { id: "_m5k9a5TbAQ", title: "School Days" },
        ],
      },
      {
        name: "Dirty Deeds Done Dirt Cheap",
        year: "1976",
        coverUrl: "https://coverartarchive.org/release/d2eda0f6-2ba6-3b42-98e9-b18a5e9a52bb/front",
        songs: [
          { id: "vZwLvpTeRTk", title: "Dirty Deeds Done Dirt Cheap" },
          { id: "NH-h8jCiyE8", title: "Love at First Feel" },
          { id: "2uxRsd3EI1I", title: "Big Balls" },
          { id: "sbAkBI0b4sE", title: "Problem Child" },
          { id: "Wj-Xg0lFD1c", title: "There's Gonna Be Some Rockin'" },
          { id: "BSIFNuFa-RE", title: "Ain't No Fun (Waiting Round to Be a Millionaire)" },
          { id: "EEpwhkE5zZg", title: "Ride On" },
          { id: "62OxFo4cZWI", title: "Squealer" },
        ],
      },
      {
        name: "Let There Be Rock",
        year: "1977",
        coverUrl: "https://coverartarchive.org/release/ecdc0365-2b46-4997-88d0-5534b1aeaa25/front",
        songs: [
          { id: "t9DWwoey1K0", title: "Go Down" },
          { id: "2i58mrloSo0", title: "Dog Eat Dog" },
          { id: "bw9EWD0nHA0", title: "Let There Be Rock" },
          { id: "lykP9Opw1Ok", title: "Bad Boy Boogie" },
          { id: "YDY6fzBvWtE", title: "Overdose" },
          { id: "qNfpkK5Uzqg", title: "Hell Ain't a Bad Place to Be" },
          { id: "LJakepFG-Mw", title: "Whole Lotta Rosie" },
        ],
      },
      {
        name: "Powerage",
        year: "1978",
        coverUrl: "https://coverartarchive.org/release/20454b32-b159-33d3-94c1-f4cd0eb53754/front",
        songs: [
          { id: "oRgaWqY6EYQ", title: "Rock 'n' Roll Damnation" },
          { id: "QFyGuuJJfKU", title: "Down Payment Blues" },
          { id: "u6PBebjP8mA", title: "Gimme a Bullet" },
          { id: "7S69xWkV4uM", title: "Riff Raff" },
          { id: "CfK6suUII0U", title: "Sin City" },
          { id: "gf23KfIW3dc", title: "What's Next to the Moon" },
          { id: "Lo2YTHCwe9M", title: "Gone Shootin'" },
          { id: "aAOj2eQQ14A", title: "Up to My Neck in You" },
          { id: "Oi1OfJLiDP8", title: "Kicked in the Teeth" },
        ],
      },
      {
        name: "Highway to Hell",
        year: "1979",
        coverUrl: "https://coverartarchive.org/release/6cd71d78-e5bf-3484-8353-9536e6bae53f/front",
        songs: [
          { id: "NhsK5WExrnE", title: "Highway to Hell" },
          { id: "UJCW0fyl_2Y", title: "Girls Got Rhythm" },
          { id: "neWtyuRL1Ng", title: "Walk All Over You" },
          { id: "ezIkqFz6jI8", title: "Touch Too Much" },
          { id: "PG7aywidg_Y", title: "Beating Around the Bush" },
          { id: "8Px-lA-stPA", title: "Shot Down in Flames" },
          { id: "PaNzI_7U0rg", title: "Get It Hot" },
          { id: "1IgSB8-tjJM", title: "If You Want Blood (You've Got It)" },
        ],
      },
      {
        name: "Back in Black",
        year: "1980",
        coverUrl:
          "https://ia802901.us.archive.org/31/items/mbid-daa04f6f-a775-3cf3-b523-cc2446159cda/mbid-daa04f6f-a775-3cf3-b523-cc2446159cda-10854963224_thumb500.jpg",
        songs: [
          { id: "etAIpkdhU9Q", title: "Hells Bells" },
          { id: "CxjINOlQDG0", title: "Shoot to Thrill" },
          { id: "D7GQq6t6h9w", title: "What Do You Do for Money Honey" },
          { id: "b3LW6P-p4Dw", title: "Given the Dog a Bone" },
          { id: "wxKdQuLWvCg", title: "Let Me Put My Love Into You" },
          { id: "pAgnJDJN4VA", title: "Back in Black" },
          { id: "Lo2qQmj0_h4", title: "You Shook Me All Night Long" },
          { id: "D_IrXsEHZxM", title: "Have a Drink on Me" },
          { id: "JPmzK5oU_sI", title: "Shake a Leg" },
          { id: "1i1ej_4l4RI", title: "Rock and Roll Ain't Noise Pollution" },
        ],
      },
      {
        name: "For Those About to Rock (We Salute You)",
        year: "1981",
        coverUrl: "https://coverartarchive.org/release/324db7a0-9a11-4116-861c-5d14851e25b5/front",
        songs: [
          { id: "62qUnEp7Wos", title: "For Those About to Rock (We Salute You)" },
          { id: "ieOz7ru4biE", title: "Put the Finger on You" },
          { id: "wYcP0k0f9fg", title: "Let's Get It Up" },
          { id: "CU4EA03ywus", title: "Inject the Venom" },
          { id: "hOeeya8ttS4", title: "Snowballed" },
          { id: "sbgKLgK1ny0", title: "Evil Walks" },
          { id: "IGProeZThj0", title: "C.O.D." },
          { id: "75OxuXHhYJI", title: "Breaking the Rules" },
          { id: "sbJAaU2tB4U", title: "Night of the Long Knives" },
          { id: "ghWH_un3Q5g", title: "Spellbound" },
        ],
      },
      {
        name: "Flick of the Switch",
        year: "1983",
        coverUrl: "https://coverartarchive.org/release/45299f9f-c3fd-43ea-845e-66f9e504dcc3/front",
        songs: [
          { id: "jr7r-mjVgfg", title: "Rising Power" },
          { id: "XFQVKgi9ECc", title: "This House Is on Fire" },
          { id: "4vFmSo0GO7Y", title: "Flick of the Switch" },
          { id: "WU6gXQY624A", title: "Landslide" },
        ],
      },
      {
        name: "If You Want Blood You've Got It",
        year: "1978",
        coverUrl: "https://coverartarchive.org/release/324d1870-b087-3d2d-aa1d-1ff938a86d76/front",
        songs: [{ id: "os5TmHox0rU", title: "Jailbreak" }],
      },
    ],
  },
  {
    name: "Alabama",
    photoUrl: "https://i.ytimg.com/vi/BKZqGJONH68/default.jpg",
    albums: [
      {
        name: "Mountain Music",
        year: "1982",
        coverUrl: "https://i.ytimg.com/vi/BKZqGJONH68/mqdefault.jpg",
        songs: [
          { id: "BKZqGJONH68", title: "Mountain Music" },
          { id: "Zzyfcys1aLM", title: "Take Me Down" },
          { id: "BKZqGJONH68", title: "Close Enough to Perfect" },
        ],
      },
      {
        name: "Feels So Right",
        year: "1981",
        coverUrl: "https://i.ytimg.com/vi/BKZqGJONH68/mqdefault.jpg",
        songs: [
          { id: "BKZqGJONH68", title: "Feels So Right" },
          { id: "Zzyfcys1aLM", title: "Love in the First Degree" },
        ],
      },
    ],
  },
  {
    name: "America",
    photoUrl: "https://i.ytimg.com/vi/zSAJ0l4OBHM/default.jpg",
    albums: [
      {
        name: "History: America's Greatest Hits",
        year: "1975",
        coverUrl: "https://i.ytimg.com/vi/zSAJ0l4OBHM/mqdefault.jpg",
        songs: [
          { id: "zSAJ0l4OBHM", title: "A Horse with No Name" },
          { id: "TjPhzgxe3L0", title: "Ventura Highway" },
          { id: "zSAJ0l4OBHM", title: "Tin Man" },
          { id: "TjPhzgxe3L0", title: "Sister Golden Hair" },
        ],
      },
      {
        name: "Homecoming",
        year: "1972",
        coverUrl: "https://i.ytimg.com/vi/zSAJ0l4OBHM/mqdefault.jpg",
        songs: [
          { id: "zSAJ0l4OBHM", title: "Ventura Highway" },
          { id: "TjPhzgxe3L0", title: "Don't Cross the River" },
        ],
      },
    ],
  },
  {
    name: "Black Sabbath",
    photoUrl: "https://i.ytimg.com/vi/0qanF-91aJo/default.jpg",
    albums: [
      {
        name: "Paranoid",
        year: "1970",
        coverUrl: "https://i.ytimg.com/vi/0qanF-91aJo/mqdefault.jpg",
        songs: [
          { id: "0qanF-91aJo", title: "Paranoid" },
          { id: "2KnyL4IFcwo", title: "Iron Man" },
          { id: "K3b6SGoN6dA", title: "War Pigs" },
          { id: "OhhOU5FUPBE", title: "Planet Caravan" },
          { id: "SbCt-8ZOqFQ", title: "Fairies Wear Boots" },
        ],
      },
      {
        name: "Master of Reality",
        year: "1971",
        coverUrl: "https://i.ytimg.com/vi/f0rXqfOc_Zw/mqdefault.jpg",
        songs: [
          { id: "f0rXqfOc_Zw", title: "Sweet Leaf" },
          { id: "JphZtpafdKY", title: "Children of the Grave" },
          { id: "K0N5yTct39s", title: "Into the Void" },
          { id: "RY8jVX525ZM", title: "Lord of This World" },
        ],
      },
      {
        name: "Black Sabbath",
        year: "1970",
        coverUrl: "https://i.ytimg.com/vi/ISXnYu-Or4w/mqdefault.jpg",
        songs: [
          { id: "ISXnYu-Or4w", title: "Black Sabbath" },
          { id: "K3b6SGoN6dA", title: "N.I.B." },
          { id: "2KnyL4IFcwo", title: "The Wizard" },
        ],
      },
    ],
  },
  {
    name: "Charles Mingus",
    photoUrl: "https://i.ytimg.com/vi/gc4zWk0n1y0/default.jpg",
    albums: [
      {
        name: "Mingus Ah Um",
        year: "1959",
        coverUrl: "https://i.ytimg.com/vi/gc4zWk0n1y0/mqdefault.jpg",
        songs: [
          { id: "gc4zWk0n1y0", title: "Goodbye Pork Pie Hat" },
          { id: "__OSyznVDOY", title: "Better Git It in Your Soul" },
          { id: "gc4zWk0n1y0", title: "Fables of Faubus" },
          { id: "__OSyznVDOY", title: "Boogie Stop Shuffle" },
        ],
      },
      {
        name: "The Black Saint and the Sinner Lady",
        year: "1963",
        coverUrl: "https://i.ytimg.com/vi/gc4zWk0n1y0/mqdefault.jpg",
        songs: [
          { id: "gc4zWk0n1y0", title: "Track A - Solo Dancer" },
          { id: "__OSyznVDOY", title: "Track B - Duet Solo Dancers" },
        ],
      },
    ],
  },
  {
    name: "Creed",
    photoUrl: "https://i.ytimg.com/vi/qnkuBUAwfe0/default.jpg",
    albums: [
      {
        name: "Human Clay",
        year: "1999",
        coverUrl: "https://i.ytimg.com/vi/qnkuBUAwfe0/mqdefault.jpg",
        songs: [
          { id: "qnkuBUAwfe0", title: "Higher" },
          { id: "99j0zLuNhi8", title: "With Arms Wide Open" },
          { id: "qnkuBUAwfe0", title: "What If" },
          { id: "99j0zLuNhi8", title: "Are You Ready?" },
        ],
      },
      {
        name: "My Own Prison",
        year: "1997",
        coverUrl: "https://i.ytimg.com/vi/qnkuBUAwfe0/mqdefault.jpg",
        songs: [
          { id: "qnkuBUAwfe0", title: "My Own Prison" },
          { id: "99j0zLuNhi8", title: "Torn" },
          { id: "qnkuBUAwfe0", title: "One" },
        ],
      },
    ],
  },
  {
    name: "Creedence Clearwater Revival",
    photoUrl: "https://i.ytimg.com/vi/Aae_RHRptRg/default.jpg",
    albums: [
      {
        name: "Chronicle",
        year: "1976",
        coverUrl: "https://i.ytimg.com/vi/Aae_RHRptRg/mqdefault.jpg",
        songs: [
          { id: "Aae_RHRptRg", title: "Fortunate Son" },
          { id: "5BmEGm-mraE", title: "Bad Moon Rising" },
          { id: "Aae_RHRptRg", title: "Have You Ever Seen the Rain" },
          { id: "5BmEGm-mraE", title: "Proud Mary" },
          { id: "Aae_RHRptRg", title: "Down on the Corner" },
        ],
      },
      {
        name: "Cosmo's Factory",
        year: "1970",
        coverUrl: "https://i.ytimg.com/vi/Aae_RHRptRg/mqdefault.jpg",
        songs: [
          { id: "Aae_RHRptRg", title: "Who'll Stop the Rain" },
          { id: "5BmEGm-mraE", title: "Lookin' Out My Back Door" },
          { id: "Aae_RHRptRg", title: "Run Through the Jungle" },
        ],
      },
    ],
  },
  {
    name: "Dave Brubeck Quartet",
    photoUrl: "https://i.ytimg.com/vi/vmDDOFXSgAs/default.jpg",
    albums: [
      {
        name: "Time Out",
        year: "1959",
        coverUrl: "https://i.ytimg.com/vi/vmDDOFXSgAs/mqdefault.jpg",
        songs: [
          { id: "vmDDOFXSgAs", title: "Take Five" },
          { id: "PHdU5sHigYQ", title: "Blue Rondo à la Turk" },
          { id: "vKbI_hEnamY", title: "Strange Meadow Lark" },
          { id: "vmDDOFXSgAs", title: "Pick Up Sticks" },
        ],
      },
      {
        name: "Time Further Out",
        year: "1961",
        coverUrl: "https://i.ytimg.com/vi/vmDDOFXSgAs/mqdefault.jpg",
        songs: [
          { id: "vmDDOFXSgAs", title: "It's a Raggy Waltz" },
          { id: "PHdU5sHigYQ", title: "Unsquare Dance" },
        ],
      },
    ],
  },
  {
    name: "Dream Theater",
    photoUrl: "https://i.ytimg.com/vi/SGRgAULYgWE/default.jpg",
    albums: [
      {
        name: "Images and Words",
        year: "1992",
        coverUrl: "https://i.ytimg.com/vi/SGRgAULYgWE/mqdefault.jpg",
        songs: [
          { id: "SGRgAULYgWE", title: "Pull Me Under" },
          { id: "myIlBdmBkDk", title: "Metropolis Pt. 1" },
          { id: "SGRgAULYgWE", title: "Take the Time" },
          { id: "oaKWrxJ7U54", title: "Surrounded" },
        ],
      },
      {
        name: "Octavarium",
        year: "2005",
        coverUrl: "https://i.ytimg.com/vi/LH_9lJxeiXQ/mqdefault.jpg",
        songs: [
          { id: "LH_9lJxeiXQ", title: "The Root of All Evil" },
          { id: "ZVMIk3xYaYo", title: "Panic Attack" },
          { id: "MuAGGZNfUkU", title: "Octavarium" },
        ],
      },
      {
        name: "Scenes from a Memory",
        year: "1999",
        coverUrl: "https://i.ytimg.com/vi/SGRgAULYgWE/mqdefault.jpg",
        songs: [
          { id: "SGRgAULYgWE", title: "The Dance of Eternity" },
          { id: "myIlBdmBkDk", title: "Home" },
          { id: "oaKWrxJ7U54", title: "Fatal Tragedy" },
        ],
      },
    ],
  },
  {
    name: "Elvis Presley",
    photoUrl: "https://i.ytimg.com/vi/gj0Rz-uP4Mk/default.jpg",
    albums: [
      {
        name: "Elvis' Golden Records",
        year: "1958",
        coverUrl: "https://i.ytimg.com/vi/gj0Rz-uP4Mk/mqdefault.jpg",
        songs: [
          { id: "gj0Rz-uP4Mk", title: "Hound Dog" },
          { id: "e9BLw4W5KU8", title: "Jailhouse Rock" },
          { id: "gj0Rz-uP4Mk", title: "Don't Be Cruel" },
          { id: "e9BLw4W5KU8", title: "Love Me Tender" },
        ],
      },
      {
        name: "Elvis Presley",
        year: "1956",
        coverUrl: "https://i.ytimg.com/vi/gj0Rz-uP4Mk/mqdefault.jpg",
        songs: [
          { id: "gj0Rz-uP4Mk", title: "Blue Suede Shoes" },
          { id: "e9BLw4W5KU8", title: "Heartbreak Hotel" },
        ],
      },
      {
        name: "Aloha from Hawaii",
        year: "1973",
        coverUrl: "https://i.ytimg.com/vi/gj0Rz-uP4Mk/mqdefault.jpg",
        songs: [
          { id: "gj0Rz-uP4Mk", title: "Suspicious Minds" },
          { id: "e9BLw4W5KU8", title: "Can't Help Falling in Love" },
        ],
      },
    ],
  },
  {
    name: "Eric Clapton",
    photoUrl: "https://i.ytimg.com/vi/uSquiIVLhrQ/default.jpg",
    albums: [
      {
        name: "Unplugged",
        year: "1992",
        coverUrl: "https://i.ytimg.com/vi/uSquiIVLhrQ/mqdefault.jpg",
        songs: [
          { id: "uSquiIVLhrQ", title: "Tears in Heaven" },
          { id: "JxPj3GAYYZ0", title: "Layla (Unplugged)" },
          { id: "uSquiIVLhrQ", title: "Nobody Knows You When You're Down and Out" },
          { id: "JxPj3GAYYZ0", title: "Old Love" },
        ],
      },
      {
        name: "Slowhand",
        year: "1977",
        coverUrl: "https://i.ytimg.com/vi/fX5USg8_1gA/mqdefault.jpg",
        songs: [
          { id: "fX5USg8_1gA", title: "Wonderful Tonight" },
          { id: "uSquiIVLhrQ", title: "Lay Down Sally" },
          { id: "JxPj3GAYYZ0", title: "Cocaine" },
        ],
      },
      {
        name: "461 Ocean Boulevard",
        year: "1974",
        coverUrl: "https://i.ytimg.com/vi/Q3VjaCy5gck/mqdefault.jpg",
        songs: [
          { id: "Q3VjaCy5gck", title: "I Shot the Sheriff" },
          { id: "uSquiIVLhrQ", title: "Let It Grow" },
        ],
      },
    ],
  },
  {
    name: "Etta James",
    photoUrl: "https://i.ytimg.com/vi/S-0TYeg9Rzc/default.jpg",
    albums: [
      {
        name: "At Last!",
        year: "1960",
        coverUrl: "https://i.ytimg.com/vi/S-0TYeg9Rzc/mqdefault.jpg",
        songs: [
          { id: "S-0TYeg9Rzc", title: "At Last" },
          { id: "nPvuNsRccVw", title: "I Just Want to Make Love to You" },
          { id: "S-0TYeg9Rzc", title: "A Sunday Kind of Love" },
          { id: "nPvuNsRccVw", title: "Trust in Me" },
        ],
      },
      {
        name: "Tell Mama",
        year: "1968",
        coverUrl: "https://i.ytimg.com/vi/S-0TYeg9Rzc/mqdefault.jpg",
        songs: [
          { id: "S-0TYeg9Rzc", title: "Tell Mama" },
          { id: "nPvuNsRccVw", title: "I'd Rather Go Blind" },
        ],
      },
    ],
  },
  {
    name: "Frank Sinatra",
    photoUrl: "https://i.ytimg.com/vi/qQzdAsjWGPg/default.jpg",
    albums: [
      {
        name: "My Way",
        year: "1969",
        coverUrl: "https://i.ytimg.com/vi/qQzdAsjWGPg/mqdefault.jpg",
        songs: [
          { id: "qQzdAsjWGPg", title: "My Way" },
          { id: "5hxibHJOE5E", title: "A Day in the Life of a Fool" },
          { id: "qQzdAsjWGPg", title: "Watch What Happens" },
        ],
      },
      {
        name: "Come Fly with Me",
        year: "1958",
        coverUrl: "https://i.ytimg.com/vi/HmQq6yLe2ww/mqdefault.jpg",
        songs: [
          { id: "HmQq6yLe2ww", title: "Come Fly with Me" },
          { id: "qQzdAsjWGPg", title: "Around the World" },
          { id: "5hxibHJOE5E", title: "Moonlight in Vermont" },
        ],
      },
      {
        name: "Songs for Swingin' Lovers!",
        year: "1956",
        coverUrl: "https://i.ytimg.com/vi/qQzdAsjWGPg/mqdefault.jpg",
        songs: [
          { id: "qQzdAsjWGPg", title: "I've Got You Under My Skin" },
          { id: "5hxibHJOE5E", title: "You Make Me Feel So Young" },
        ],
      },
    ],
  },
  {
    name: "Green Day",
    photoUrl: "https://i.ytimg.com/vi/Ee_uujKuJMI/default.jpg",
    albums: [
      {
        name: "American Idiot",
        year: "2004",
        coverUrl: "https://i.ytimg.com/vi/Ee_uujKuJMI/mqdefault.jpg",
        songs: [
          { id: "Ee_uujKuJMI", title: "American Idiot" },
          { id: "Soa3gO7tL-c", title: "Boulevard of Broken Dreams" },
          { id: "A1OqtIqzScI", title: "Holiday" },
          { id: "jVO8sUrs-Pw", title: "Wake Me Up When September Ends" },
          { id: "NUTGr5t3MoY", title: "Jesus of Suburbia" },
        ],
      },
      {
        name: "Dookie",
        year: "1994",
        coverUrl: "https://i.ytimg.com/vi/NUTGr5t3MoY/mqdefault.jpg",
        songs: [
          { id: "NUTGr5t3MoY", title: "Basket Case" },
          { id: "NU9JoFKlaZ0", title: "When I Come Around" },
          { id: "42BBdzzgPNM", title: "Longview" },
          { id: "jVO8sUrs-Pw", title: "Welcome to Paradise" },
        ],
      },
      {
        name: "21st Century Breakdown",
        year: "2009",
        coverUrl: "https://i.ytimg.com/vi/Ee_uujKuJMI/mqdefault.jpg",
        songs: [
          { id: "Ee_uujKuJMI", title: "21 Guns" },
          { id: "NUTGr5t3MoY", title: "Know Your Enemy" },
          { id: "NU9JoFKlaZ0", title: "East Jesus Nowhere" },
        ],
      },
    ],
  },
  {
    name: "Guns N' Roses",
    photoUrl: "https://i.ytimg.com/vi/1w7OgIMMRc4/default.jpg",
    albums: [
      {
        name: "Appetite for Destruction",
        year: "1987",
        coverUrl: "https://i.ytimg.com/vi/1w7OgIMMRc4/mqdefault.jpg",
        songs: [
          { id: "1w7OgIMMRc4", title: "Sweet Child O' Mine" },
          { id: "o1tj2zJ2Wvg", title: "Welcome to the Jungle" },
          { id: "8SbUC-UaAxE", title: "Paradise City" },
          { id: "Rbm6GXllBiw", title: "Nightrain" },
          { id: "o7FqOZgq2yU", title: "Mr. Brownstone" },
        ],
      },
      {
        name: "Use Your Illusion I",
        year: "1991",
        coverUrl: "https://i.ytimg.com/vi/8gFCW3PHBws/mqdefault.jpg",
        songs: [
          { id: "8gFCW3PHBws", title: "November Rain" },
          { id: "dpmAY059TTY", title: "Don't Cry" },
          { id: "AkFqg5wAuWk", title: "Live and Let Die" },
          { id: "zRIbf6JqkNc", title: "The Garden" },
        ],
      },
      {
        name: "Use Your Illusion II",
        year: "1991",
        coverUrl: "https://i.ytimg.com/vi/o2EzwJBBVi8/mqdefault.jpg",
        songs: [
          { id: "o2EzwJBBVi8", title: "Civil War" },
          { id: "8LdLIqkmMB0", title: "Knockin' on Heaven's Door" },
          { id: "dpmAY059TTY", title: "Estranged" },
        ],
      },
    ],
  },
  {
    name: "Hans Zimmer",
    photoUrl: "https://i.ytimg.com/vi/RxabLA7UQ9k/default.jpg",
    albums: [
      {
        name: "Inception",
        year: "2010",
        coverUrl: "https://i.ytimg.com/vi/RxabLA7UQ9k/mqdefault.jpg",
        songs: [
          { id: "RxabLA7UQ9k", title: "Time" },
          { id: "imamcajBEJs", title: "Dream Is Collapsing" },
          { id: "RxabLA7UQ9k", title: "Mombasa" },
          { id: "imamcajBEJs", title: "Half Remembered Dream" },
        ],
      },
      {
        name: "Interstellar",
        year: "2014",
        coverUrl: "https://i.ytimg.com/vi/UDVtMYqUAyw/mqdefault.jpg",
        songs: [
          { id: "UDVtMYqUAyw", title: "Cornfield Chase" },
          { id: "zg0xBjegI7A", title: "Mountains" },
          { id: "UDVtMYqUAyw", title: "No Time for Caution" },
          { id: "zg0xBjegI7A", title: "Stay" },
        ],
      },
      {
        name: "The Dark Knight",
        year: "2008",
        coverUrl: "https://i.ytimg.com/vi/w1B3Mgklfd0/mqdefault.jpg",
        songs: [
          { id: "w1B3Mgklfd0", title: "Why So Serious?" },
          { id: "RxabLA7UQ9k", title: "Like a Dog Chasing Cars" },
          { id: "imamcajBEJs", title: "A Dark Knight" },
        ],
      },
    ],
  },
  {
    name: "Hank Williams",
    photoUrl: "https://i.ytimg.com/vi/4WXYjm74WFI/default.jpg",
    albums: [
      {
        name: "40 Greatest Hits",
        year: "1978",
        coverUrl: "https://i.ytimg.com/vi/4WXYjm74WFI/mqdefault.jpg",
        songs: [
          { id: "4WXYjm74WFI", title: "Your Cheatin' Heart" },
          { id: "tvOOvZm5V_U", title: "Hey Good Lookin'" },
          { id: "4WXYjm74WFI", title: "I'm So Lonesome I Could Cry" },
          { id: "tvOOvZm5V_U", title: "Jambalaya (On the Bayou)" },
        ],
      },
      {
        name: "Lovesick Blues",
        year: "1949",
        coverUrl: "https://i.ytimg.com/vi/4WXYjm74WFI/mqdefault.jpg",
        songs: [
          { id: "4WXYjm74WFI", title: "Lovesick Blues" },
          { id: "tvOOvZm5V_U", title: "Wedding Bells" },
        ],
      },
    ],
  },
  {
    name: "Hoobastank",
    photoUrl: "https://i.ytimg.com/vi/fV4DiAyExN0/default.jpg",
    albums: [
      {
        name: "The Reason",
        year: "2003",
        coverUrl: "https://i.ytimg.com/vi/fV4DiAyExN0/mqdefault.jpg",
        songs: [
          { id: "fV4DiAyExN0", title: "The Reason" },
          { id: "Dn8-4tjPxD8", title: "Out of Control" },
          { id: "fV4DiAyExN0", title: "Same Direction" },
          { id: "Dn8-4tjPxD8", title: "Disappear" },
        ],
      },
      {
        name: "Hoobastank",
        year: "2001",
        coverUrl: "https://i.ytimg.com/vi/fV4DiAyExN0/mqdefault.jpg",
        songs: [
          { id: "fV4DiAyExN0", title: "Crawling in the Dark" },
          { id: "Dn8-4tjPxD8", title: "Running Away" },
          { id: "fV4DiAyExN0", title: "Remember Me" },
        ],
      },
    ],
  },
  {
    name: "Iron Maiden",
    photoUrl: "https://i.ytimg.com/vi/WxnN05vOuSM/default.jpg",
    albums: [
      {
        name: "The Number of the Beast",
        year: "1982",
        coverUrl: "https://i.ytimg.com/vi/WxnN05vOuSM/mqdefault.jpg",
        songs: [
          { id: "WxnN05vOuSM", title: "The Number of the Beast" },
          { id: "geHLdg_VNww", title: "Run to the Hills" },
          { id: "WxnN05vOuSM", title: "Hallowed Be Thy Name" },
          { id: "geHLdg_VNww", title: "Children of the Damned" },
        ],
      },
      {
        name: "Powerslave",
        year: "1984",
        coverUrl: "https://i.ytimg.com/vi/YZ7JZg0rIhU/mqdefault.jpg",
        songs: [
          { id: "YZ7JZg0rIhU", title: "Aces High" },
          { id: "WxnN05vOuSM", title: "2 Minutes to Midnight" },
          { id: "geHLdg_VNww", title: "Powerslave" },
        ],
      },
      {
        name: "Piece of Mind",
        year: "1983",
        coverUrl: "https://i.ytimg.com/vi/WxnN05vOuSM/mqdefault.jpg",
        songs: [
          { id: "WxnN05vOuSM", title: "The Trooper" },
          { id: "geHLdg_VNww", title: "Flight of Icarus" },
          { id: "YZ7JZg0rIhU", title: "Revelations" },
        ],
      },
    ],
  },
  {
    name: "J Dilla",
    photoUrl: "https://i.ytimg.com/vi/AdZK0HeYkwM/default.jpg",
    albums: [
      {
        name: "Donuts",
        year: "2006",
        coverUrl: "https://i.ytimg.com/vi/AdZK0HeYkwM/mqdefault.jpg",
        songs: [
          { id: "AdZK0HeYkwM", title: "Workinonit" },
          { id: "fC3Cthm0HFU", title: "Time: The Donut of the Heart" },
          { id: "AdZK0HeYkwM", title: "Waves" },
          { id: "fC3Cthm0HFU", title: "Don't Cry" },
        ],
      },
      {
        name: "The Shining",
        year: "2006",
        coverUrl: "https://i.ytimg.com/vi/AdZK0HeYkwM/mqdefault.jpg",
        songs: [
          { id: "AdZK0HeYkwM", title: "So Far to Go" },
          { id: "fC3Cthm0HFU", title: "E=MC2" },
          { id: "AdZK0HeYkwM", title: "Love" },
        ],
      },
    ],
  },
  {
    name: "John Coltrane",
    photoUrl: "https://i.ytimg.com/vi/ll3CMgiUPuU/default.jpg",
    albums: [
      {
        name: "A Love Supreme",
        year: "1965",
        coverUrl: "https://i.ytimg.com/vi/ll3CMgiUPuU/mqdefault.jpg",
        songs: [
          { id: "ll3CMgiUPuU", title: "Acknowledgement" },
          { id: "clC6cgoh1sU", title: "Resolution" },
          { id: "ll3CMgiUPuU", title: "Pursuance" },
          { id: "clC6cgoh1sU", title: "Psalm" },
        ],
      },
      {
        name: "Blue Train",
        year: "1957",
        coverUrl: "https://i.ytimg.com/vi/XpZHUVjQydI/mqdefault.jpg",
        songs: [
          { id: "XpZHUVjQydI", title: "Blue Train" },
          { id: "ll3CMgiUPuU", title: "Moment's Notice" },
          { id: "clC6cgoh1sU", title: "Locomotion" },
        ],
      },
      {
        name: "Giant Steps",
        year: "1960",
        coverUrl: "https://i.ytimg.com/vi/30FTr6G53VU/mqdefault.jpg",
        songs: [
          { id: "30FTr6G53VU", title: "Giant Steps" },
          { id: "ll3CMgiUPuU", title: "Naima" },
          { id: "clC6cgoh1sU", title: "Mr. P.C." },
        ],
      },
    ],
  },
  {
    name: "John Denver",
    photoUrl: "https://i.ytimg.com/vi/1vrEljMfXYo/default.jpg",
    albums: [
      {
        name: "Poems, Prayers & Promises",
        year: "1971",
        coverUrl: "https://i.ytimg.com/vi/1vrEljMfXYo/mqdefault.jpg",
        songs: [
          { id: "1vrEljMfXYo", title: "Take Me Home, Country Roads" },
          { id: "ik8b8Z0mPkk", title: "Poems, Prayers and Promises" },
          { id: "1vrEljMfXYo", title: "Sunshine on My Shoulders" },
        ],
      },
      {
        name: "Back Home Again",
        year: "1974",
        coverUrl: "https://i.ytimg.com/vi/1vrEljMfXYo/mqdefault.jpg",
        songs: [
          { id: "1vrEljMfXYo", title: "Annie's Song" },
          { id: "ik8b8Z0mPkk", title: "Back Home Again" },
        ],
      },
      {
        name: "Rocky Mountain High",
        year: "1972",
        coverUrl: "https://i.ytimg.com/vi/eOB4VbtlWw4/mqdefault.jpg",
        songs: [
          { id: "eOB4VbtlWw4", title: "Rocky Mountain High" },
          { id: "1vrEljMfXYo", title: "Mother Nature's Son" },
        ],
      },
    ],
  },
  {
    name: "John Mayer",
    photoUrl: "https://i.ytimg.com/vi/N5EnGwXV_Pg/default.jpg",
    albums: [
      {
        name: "Continuum",
        year: "2006",
        coverUrl: "https://i.ytimg.com/vi/N5EnGwXV_Pg/mqdefault.jpg",
        songs: [
          { id: "N5EnGwXV_Pg", title: "Waiting on the World to Change" },
          { id: "nTLgLlfhXyo", title: "Gravity" },
          { id: "N5EnGwXV_Pg", title: "Slow Dancing in a Burning Room" },
          { id: "nTLgLlfhXyo", title: "Belief" },
          { id: "N5EnGwXV_Pg", title: "Stop This Train" },
        ],
      },
      {
        name: "Room for Squares",
        year: "2001",
        coverUrl: "https://i.ytimg.com/vi/Ea2HS8NL4s4/mqdefault.jpg",
        songs: [
          { id: "Ea2HS8NL4s4", title: "No Such Thing" },
          { id: "N5EnGwXV_Pg", title: "Your Body Is a Wonderland" },
          { id: "nTLgLlfhXyo", title: "Why Georgia" },
        ],
      },
      {
        name: "The Search for Everything",
        year: "2017",
        coverUrl: "https://i.ytimg.com/vi/N5EnGwXV_Pg/mqdefault.jpg",
        songs: [
          { id: "N5EnGwXV_Pg", title: "Love on the Weekend" },
          { id: "nTLgLlfhXyo", title: "Still Feel Like Your Man" },
          { id: "Ea2HS8NL4s4", title: "In the Blood" },
        ],
      },
    ],
  },
  {
    name: "Johnny Cash",
    photoUrl: "https://i.ytimg.com/vi/mIBTg7q9oNc/default.jpg",
    albums: [
      {
        name: "At Folsom Prison",
        year: "1968",
        coverUrl: "https://i.ytimg.com/vi/mIBTg7q9oNc/mqdefault.jpg",
        songs: [
          { id: "mIBTg7q9oNc", title: "Folsom Prison Blues" },
          { id: "1WBhXkQiVSs", title: "Jackson" },
          { id: "mIBTg7q9oNc", title: "Dark as a Dungeon" },
        ],
      },
      {
        name: "American IV: The Man Comes Around",
        year: "2002",
        coverUrl: "https://i.ytimg.com/vi/vt1Pwfnh5pc/mqdefault.jpg",
        songs: [
          { id: "vt1Pwfnh5pc", title: "Hurt" },
          { id: "mIBTg7q9oNc", title: "The Man Comes Around" },
          { id: "1WBhXkQiVSs", title: "Personal Jesus" },
        ],
      },
      {
        name: "Greatest Hits",
        year: "1967",
        coverUrl: "https://i.ytimg.com/vi/mIBTg7q9oNc/mqdefault.jpg",
        songs: [
          { id: "mIBTg7q9oNc", title: "Ring of Fire" },
          { id: "1WBhXkQiVSs", title: "I Walk the Line" },
          { id: "vt1Pwfnh5pc", title: "Get Rhythm" },
        ],
      },
    ],
  },
  {
    name: "Jungle",
    photoUrl: "https://i.ytimg.com/vi/BcsfftwLUf0/default.jpg",
    albums: [
      {
        name: "Jungle",
        year: "2014",
        coverUrl: "https://i.ytimg.com/vi/BcsfftwLUf0/mqdefault.jpg",
        songs: [
          { id: "BcsfftwLUf0", title: "Busy Earnin'" },
          { id: "Y4UckOGdZtI", title: "The Heat" },
          { id: "EcKzbF4ZFjg", title: "Time" },
          { id: "BcsfftwLUf0", title: "Platoon" },
          { id: "Y4UckOGdZtI", title: "Drops" },
        ],
      },
      {
        name: "For Ever",
        year: "2018",
        coverUrl: "https://i.ytimg.com/vi/qk_cfd-Uiw8/mqdefault.jpg",
        songs: [
          { id: "qk_cfd-Uiw8", title: "Heavy, California" },
          { id: "Y4UckOGdZtI", title: "House in LA" },
          { id: "EcKzbF4ZFjg", title: "Casio" },
        ],
      },
      {
        name: "Volcano",
        year: "2023",
        coverUrl: "https://i.ytimg.com/vi/BcsfftwLUf0/mqdefault.jpg",
        songs: [
          { id: "BcsfftwLUf0", title: "Back on 74" },
          { id: "Y4UckOGdZtI", title: "Candle Flame" },
        ],
      },
    ],
  },
  {
    name: "Korn",
    photoUrl: "https://i.ytimg.com/vi/jRGrNDV2mKc/default.jpg",
    albums: [
      {
        name: "Korn",
        year: "1994",
        coverUrl: "https://i.ytimg.com/vi/jRGrNDV2mKc/mqdefault.jpg",
        songs: [
          { id: "jRGrNDV2mKc", title: "Blind" },
          { id: "SGK00Q7xx-s", title: "Shoots and Ladders" },
          { id: "jRGrNDV2mKc", title: "Clown" },
          { id: "SGK00Q7xx-s", title: "Faget" },
        ],
      },
      {
        name: "Follow the Leader",
        year: "1998",
        coverUrl: "https://i.ytimg.com/vi/jRGrNDV2mKc/mqdefault.jpg",
        songs: [
          { id: "jRGrNDV2mKc", title: "Freak on a Leash" },
          { id: "SGK00Q7xx-s", title: "Got the Life" },
          { id: "jRGrNDV2mKc", title: "Dead Bodies Everywhere" },
        ],
      },
      {
        name: "Issues",
        year: "1999",
        coverUrl: "https://i.ytimg.com/vi/CSJXle3LP_Q/mqdefault.jpg",
        songs: [
          { id: "CSJXle3LP_Q", title: "Falling Away from Me" },
          { id: "jRGrNDV2mKc", title: "Make Me Bad" },
          { id: "SGK00Q7xx-s", title: "Somebody Someone" },
        ],
      },
    ],
  },
  {
    name: "Led Zeppelin",
    photoUrl: "https://i.ytimg.com/vi/QkF3oxziUI4/default.jpg",
    albums: [
      {
        name: "Led Zeppelin IV",
        year: "1971",
        coverUrl: "https://i.ytimg.com/vi/QkF3oxziUI4/mqdefault.jpg",
        songs: [
          { id: "QkF3oxziUI4", title: "Stairway to Heaven" },
          { id: "RlNhD0oS5pk", title: "Black Dog" },
          { id: "QkF3oxziUI4", title: "Rock and Roll" },
          { id: "RlNhD0oS5pk", title: "When the Levee Breaks" },
        ],
      },
      {
        name: "Led Zeppelin II",
        year: "1969",
        coverUrl: "https://i.ytimg.com/vi/yBuub4Xe1mw/mqdefault.jpg",
        songs: [
          { id: "yBuub4Xe1mw", title: "Whole Lotta Love" },
          { id: "QkF3oxziUI4", title: "Ramble On" },
          { id: "RlNhD0oS5pk", title: "Heartbreaker" },
        ],
      },
      {
        name: "Physical Graffiti",
        year: "1975",
        coverUrl: "https://i.ytimg.com/vi/QkF3oxziUI4/mqdefault.jpg",
        songs: [
          { id: "QkF3oxziUI4", title: "Kashmir" },
          { id: "RlNhD0oS5pk", title: "Trampled Under Foot" },
          { id: "yBuub4Xe1mw", title: "Houses of the Holy" },
        ],
      },
    ],
  },
  {
    name: "Linkin Park",
    photoUrl: "https://i.ytimg.com/vi/eVTXPUF4Oz4/default.jpg",
    albums: [
      {
        name: "Hybrid Theory",
        year: "2000",
        coverUrl: "https://i.ytimg.com/vi/eVTXPUF4Oz4/mqdefault.jpg",
        songs: [
          { id: "eVTXPUF4Oz4", title: "In The End" },
          { id: "v2H4l9RpkwM", title: "Papercut" },
          { id: "kXYiU_JCYtU", title: "Crawling" },
          { id: "5qF_qbaWt3Q", title: "One Step Closer" },
          { id: "Gd9OhYroLN0", title: "Points of Authority" },
        ],
      },
      {
        name: "Meteora",
        year: "2003",
        coverUrl: "https://i.ytimg.com/vi/zsCD5XCu6CM/mqdefault.jpg",
        songs: [
          { id: "zsCD5XCu6CM", title: "Numb" },
          { id: "d_f5TwIWWKQ", title: "Somewhere I Belong" },
          { id: "WNeLUngb-Xg", title: "Faint" },
          { id: "OnuuYcqhzCE", title: "Breaking the Habit" },
          { id: "7NK_JOkuSVY", title: "From the Inside" },
        ],
      },
      {
        name: "Minutes to Midnight",
        year: "2007",
        coverUrl: "https://i.ytimg.com/vi/Gd9OhYroLN0/mqdefault.jpg",
        songs: [
          { id: "Gd9OhYroLN0", title: "What I've Done" },
          { id: "Tm8LGxTLtQk", title: "Bleed It Out" },
          { id: "5dmQ3QWpy1Q", title: "Shadow of the Day" },
        ],
      },
    ],
  },
  {
    name: "Lou Reed",
    photoUrl: "https://i.ytimg.com/vi/QYEC4TZsy-c/default.jpg",
    albums: [
      {
        name: "Transformer",
        year: "1972",
        coverUrl: "https://i.ytimg.com/vi/QYEC4TZsy-c/mqdefault.jpg",
        songs: [
          { id: "QYEC4TZsy-c", title: "Walk on the Wild Side" },
          { id: "oG6fayQBm9w", title: "Perfect Day" },
          { id: "QYEC4TZsy-c", title: "Satellite of Love" },
          { id: "oG6fayQBm9w", title: "Vicious" },
        ],
      },
      {
        name: "Berlin",
        year: "1973",
        coverUrl: "https://i.ytimg.com/vi/QYEC4TZsy-c/mqdefault.jpg",
        songs: [
          { id: "QYEC4TZsy-c", title: "Caroline Says II" },
          { id: "oG6fayQBm9w", title: "How Do You Think It Feels" },
        ],
      },
    ],
  },
  {
    name: "Lynyrd Skynyrd",
    photoUrl: "https://i.ytimg.com/vi/ye5BuYf8q4o/default.jpg",
    albums: [
      {
        name: "Pronounced 'Lĕh-'nérd 'Skin-'nérd",
        year: "1973",
        coverUrl: "https://i.ytimg.com/vi/ye5BuYf8q4o/mqdefault.jpg",
        songs: [
          { id: "ye5BuYf8q4o", title: "Free Bird" },
          { id: "Cg_8knBHEyw", title: "Simple Man" },
          { id: "ye5BuYf8q4o", title: "Tuesday's Gone" },
          { id: "Cg_8knBHEyw", title: "Gimme Three Steps" },
        ],
      },
      {
        name: "Second Helping",
        year: "1974",
        coverUrl: "https://i.ytimg.com/vi/np0solnL1XY/mqdefault.jpg",
        songs: [
          { id: "np0solnL1XY", title: "Sweet Home Alabama" },
          { id: "ye5BuYf8q4o", title: "Don't Ask Me No Questions" },
          { id: "Cg_8knBHEyw", title: "The Ballad of Curtis Loew" },
        ],
      },
      {
        name: "Street Survivors",
        year: "1977",
        coverUrl: "https://i.ytimg.com/vi/np0solnL1XY/mqdefault.jpg",
        songs: [
          { id: "np0solnL1XY", title: "What's Your Name" },
          { id: "ye5BuYf8q4o", title: "That Smell" },
        ],
      },
    ],
  },
  {
    name: "M83",
    photoUrl: "https://i.ytimg.com/vi/dX3k_QDnzHE/default.jpg",
    albums: [
      {
        name: "Hurry Up, We're Dreaming",
        year: "2011",
        coverUrl: "https://i.ytimg.com/vi/dX3k_QDnzHE/mqdefault.jpg",
        songs: [
          { id: "dX3k_QDnzHE", title: "Midnight City" },
          { id: "lAwYodrBr2Q", title: "Wait" },
          { id: "Elorx4MB8WE", title: "Reunion" },
          { id: "dX3k_QDnzHE", title: "Intro" },
          { id: "lAwYodrBr2Q", title: "Steve McQueen" },
        ],
      },
      {
        name: "Saturdays = Youth",
        year: "2008",
        coverUrl: "https://i.ytimg.com/vi/dX3k_QDnzHE/mqdefault.jpg",
        songs: [
          { id: "dX3k_QDnzHE", title: "Kim & Jessie" },
          { id: "lAwYodrBr2Q", title: "Graveyard Girl" },
          { id: "Elorx4MB8WE", title: "Couleurs" },
        ],
      },
    ],
  },
  {
    name: "Metallica",
    photoUrl: "https://i.ytimg.com/vi/xnKhsTXoKCI/default.jpg",
    albums: [
      {
        name: "Master of Puppets",
        year: "1986",
        coverUrl: "https://i.ytimg.com/vi/xnKhsTXoKCI/mqdefault.jpg",
        songs: [
          { id: "xnKhsTXoKCI", title: "Master of Puppets" },
          { id: "WM8bTdBs-cw", title: "Battery" },
          { id: "tAGnKpE4NCI", title: "Welcome Home (Sanitarium)" },
          { id: "eeqGuaAl6Ic", title: "Disposable Heroes" },
          { id: "KC8T5FGZYx8", title: "Orion" },
        ],
      },
      {
        name: "Metallica (Black Album)",
        year: "1991",
        coverUrl: "https://i.ytimg.com/vi/CD-E-LDc384/mqdefault.jpg",
        songs: [
          { id: "CD-E-LDc384", title: "Enter Sandman" },
          { id: "uhBHL3v4d3I", title: "The Unforgiven" },
          { id: "WEQnzs8wl6E", title: "Nothing Else Matters" },
          { id: "Tj75Arhq5ho", title: "Sad But True" },
          { id: "WM1RChZF1EU", title: "Wherever I May Roam" },
        ],
      },
      {
        name: "Ride the Lightning",
        year: "1984",
        coverUrl: "https://i.ytimg.com/vi/uebInqG1pJI/mqdefault.jpg",
        songs: [
          { id: "uebInqG1pJI", title: "Fade to Black" },
          { id: "YT516h7QwA4", title: "For Whom the Bell Tolls" },
          { id: "xnKhsTXoKCI", title: "Creeping Death" },
        ],
      },
    ],
  },
  {
    name: "Miles Davis",
    photoUrl: "https://i.ytimg.com/vi/kbxtYqA6ypM/default.jpg",
    albums: [
      {
        name: "Kind of Blue",
        year: "1959",
        coverUrl: "https://i.ytimg.com/vi/kbxtYqA6ypM/mqdefault.jpg",
        songs: [
          { id: "kbxtYqA6ypM", title: "So What" },
          { id: "zqNTltOGh5c", title: "Freddie Freeloader" },
          { id: "ylXk1LBvIqU", title: "Blue in Green" },
          { id: "32s1zi4SwaE", title: "All Blues" },
          { id: "SbCt-8ZOqFQ", title: "Flamenco Sketches" },
        ],
      },
      {
        name: "Bitches Brew",
        year: "1970",
        coverUrl: "https://i.ytimg.com/vi/SbCt-8ZOqFQ/mqdefault.jpg",
        songs: [
          { id: "SbCt-8ZOqFQ", title: "Pharaoh's Dance" },
          { id: "0GWeMHXDVkI", title: "Bitches Brew" },
          { id: "kbxtYqA6ypM", title: "Spanish Key" },
        ],
      },
      {
        name: "Sketches of Spain",
        year: "1960",
        coverUrl: "https://i.ytimg.com/vi/kbxtYqA6ypM/mqdefault.jpg",
        songs: [
          { id: "kbxtYqA6ypM", title: "Concierto de Aranjuez" },
          { id: "zqNTltOGh5c", title: "Will O' the Wisp" },
          { id: "ylXk1LBvIqU", title: "Saeta" },
        ],
      },
    ],
  },
  {
    name: "Nina Simone",
    photoUrl: "https://i.ytimg.com/vi/GUcXI2BIUOQ/default.jpg",
    albums: [
      {
        name: "I Put a Spell on You",
        year: "1965",
        coverUrl: "https://i.ytimg.com/vi/GUcXI2BIUOQ/mqdefault.jpg",
        songs: [
          { id: "GUcXI2BIUOQ", title: "Feeling Good" },
          { id: "ua2k52n_Bvw", title: "I Put a Spell on You" },
          { id: "GUcXI2BIUOQ", title: "Ne Me Quitte Pas" },
        ],
      },
      {
        name: "Pastel Blues",
        year: "1965",
        coverUrl: "https://i.ytimg.com/vi/GUcXI2BIUOQ/mqdefault.jpg",
        songs: [
          { id: "GUcXI2BIUOQ", title: "Sinnerman" },
          { id: "ua2k52n_Bvw", title: "Strange Fruit" },
          { id: "GUcXI2BIUOQ", title: "Tell Me More and More" },
        ],
      },
    ],
  },
  {
    name: "Nujabes",
    photoUrl: "https://i.ytimg.com/vi/WrO9PTpuSSs/default.jpg",
    albums: [
      {
        name: "Modal Soul",
        year: "2005",
        coverUrl: "https://i.ytimg.com/vi/WrO9PTpuSSs/mqdefault.jpg",
        songs: [
          { id: "WrO9PTpuSSs", title: "Feather" },
          { id: "P5-2-jD-42Q", title: "Luv(sic) Part 3" },
          { id: "WrO9PTpuSSs", title: "Reflection Eternal" },
          { id: "P5-2-jD-42Q", title: "Modal Soul" },
        ],
      },
      {
        name: "Metaphorical Music",
        year: "2003",
        coverUrl: "https://i.ytimg.com/vi/Z-tTmSY4m4M/mqdefault.jpg",
        songs: [
          { id: "Z-tTmSY4m4M", title: "Blessing It" },
          { id: "WrO9PTpuSSs", title: "Aruarian Dance" },
          { id: "P5-2-jD-42Q", title: "Lady Brown" },
          { id: "Z-tTmSY4m4M", title: "Kumomi" },
        ],
      },
      {
        name: "Spiritual State",
        year: "2011",
        coverUrl: "https://i.ytimg.com/vi/WrO9PTpuSSs/mqdefault.jpg",
        songs: [
          { id: "WrO9PTpuSSs", title: "Flowers" },
          { id: "P5-2-jD-42Q", title: "The Space Between Two World" },
          { id: "Z-tTmSY4m4M", title: "Counting Stars" },
        ],
      },
    ],
  },
  {
    name: "Oasis",
    photoUrl: "https://i.ytimg.com/vi/tI-5uv4wryI/default.jpg",
    albums: [
      {
        name: "(What's the Story) Morning Glory?",
        year: "1995",
        coverUrl: "https://i.ytimg.com/vi/tI-5uv4wryI/mqdefault.jpg",
        songs: [
          { id: "tI-5uv4wryI", title: "Wonderwall" },
          { id: "r8OipmKFDeM", title: "Don't Look Back in Anger" },
          { id: "jyJU2136ym4", title: "Champagne Supernova" },
          { id: "tI-5uv4wryI", title: "Some Might Say" },
          { id: "r8OipmKFDeM", title: "Cast No Shadow" },
        ],
      },
      {
        name: "Definitely Maybe",
        year: "1994",
        coverUrl: "https://i.ytimg.com/vi/tI-5uv4wryI/mqdefault.jpg",
        songs: [
          { id: "tI-5uv4wryI", title: "Live Forever" },
          { id: "r8OipmKFDeM", title: "Supersonic" },
          { id: "jyJU2136ym4", title: "Cigarettes & Alcohol" },
        ],
      },
    ],
  },
  {
    name: "Ozzy Osbourne",
    photoUrl: "https://i.ytimg.com/vi/tMDFv5m18Pw/default.jpg",
    albums: [
      {
        name: "Blizzard of Ozz",
        year: "1980",
        coverUrl: "https://i.ytimg.com/vi/tMDFv5m18Pw/mqdefault.jpg",
        songs: [
          { id: "tMDFv5m18Pw", title: "Crazy Train" },
          { id: "9CC_9aFuEkA", title: "Mr. Crowley" },
          { id: "tMDFv5m18Pw", title: "I Don't Know" },
        ],
      },
      {
        name: "Diary of a Madman",
        year: "1981",
        coverUrl: "https://i.ytimg.com/vi/tMDFv5m18Pw/mqdefault.jpg",
        songs: [
          { id: "tMDFv5m18Pw", title: "Flying High Again" },
          { id: "9CC_9aFuEkA", title: "Over the Mountain" },
        ],
      },
      {
        name: "No More Tears",
        year: "1991",
        coverUrl: "https://i.ytimg.com/vi/CprfjfN5PRs/mqdefault.jpg",
        songs: [
          { id: "CprfjfN5PRs", title: "No More Tears" },
          { id: "tMDFv5m18Pw", title: "Mama, I'm Coming Home" },
        ],
      },
    ],
  },
  {
    name: "Patsy Cline",
    photoUrl: "https://i.ytimg.com/vi/47dtFZ8CFo8/default.jpg",
    albums: [
      {
        name: "Greatest Hits",
        year: "1967",
        coverUrl: "https://i.ytimg.com/vi/47dtFZ8CFo8/mqdefault.jpg",
        songs: [
          { id: "47dtFZ8CFo8", title: "Crazy" },
          { id: "2rSJxRGCHD8", title: "I Fall to Pieces" },
          { id: "47dtFZ8CFo8", title: "Walkin' After Midnight" },
          { id: "2rSJxRGCHD8", title: "Sweet Dreams" },
        ],
      },
      {
        name: "Sentimentally Yours",
        year: "1962",
        coverUrl: "https://i.ytimg.com/vi/47dtFZ8CFo8/mqdefault.jpg",
        songs: [
          { id: "47dtFZ8CFo8", title: "She's Got You" },
          { id: "2rSJxRGCHD8", title: "Strange" },
        ],
      },
    ],
  },
  {
    name: "Pink Floyd",
    photoUrl: "https://i.ytimg.com/vi/y-E7_VHLvkE/default.jpg",
    albums: [
      {
        name: "The Dark Side of the Moon",
        year: "1973",
        coverUrl: "https://i.ytimg.com/vi/y-E7_VHLvkE/mqdefault.jpg",
        songs: [
          { id: "y-E7_VHLvkE", title: "Time" },
          { id: "mrojrDCI02k", title: "Money" },
          { id: "cWGE9Gi0bB0", title: "Us and Them" },
          { id: "53N99Nim6WE", title: "Breathe" },
          { id: "DVQ3-Xe_suY", title: "The Great Gig in the Sky" },
        ],
      },
      {
        name: "The Wall",
        year: "1979",
        coverUrl: "https://i.ytimg.com/vi/YR5ApYxkU-U/mqdefault.jpg",
        songs: [
          { id: "YR5ApYxkU-U", title: "Another Brick in the Wall" },
          { id: "x-xTttimcNk", title: "Comfortably Numb" },
          { id: "fD-Gr6suL0k", title: "Hey You" },
          { id: "L8cCPH1qnYI", title: "Run Like Hell" },
        ],
      },
      {
        name: "Wish You Were Here",
        year: "1975",
        coverUrl: "https://i.ytimg.com/vi/IXdNnw99-Ic/mqdefault.jpg",
        songs: [
          { id: "IXdNnw99-Ic", title: "Wish You Were Here" },
          { id: "xmwJfOXNFaQ", title: "Shine On You Crazy Diamond" },
          { id: "fD-Gr6suL0k", title: "Have a Cigar" },
        ],
      },
    ],
  },
  {
    name: "Rage Against the Machine",
    photoUrl: "https://i.ytimg.com/vi/3L4YrGaR8E4/default.jpg",
    albums: [
      {
        name: "Rage Against the Machine",
        year: "1992",
        coverUrl: "https://i.ytimg.com/vi/3L4YrGaR8E4/mqdefault.jpg",
        songs: [
          { id: "3L4YrGaR8E4", title: "Killing in the Name" },
          { id: "my6bfA14vMQ", title: "Bullet in the Head" },
          { id: "3L4YrGaR8E4", title: "Bombtrack" },
          { id: "my6bfA14vMQ", title: "Know Your Enemy" },
        ],
      },
      {
        name: "Evil Empire",
        year: "1996",
        coverUrl: "https://i.ytimg.com/vi/3L4YrGaR8E4/mqdefault.jpg",
        songs: [
          { id: "3L4YrGaR8E4", title: "Bulls on Parade" },
          { id: "my6bfA14vMQ", title: "People of the Sun" },
          { id: "3L4YrGaR8E4", title: "Vietnow" },
        ],
      },
      {
        name: "The Battle of Los Angeles",
        year: "1999",
        coverUrl: "https://i.ytimg.com/vi/w211KOQ5BMI/mqdefault.jpg",
        songs: [
          { id: "w211KOQ5BMI", title: "Sleep Now in the Fire" },
          { id: "3L4YrGaR8E4", title: "Guerrilla Radio" },
          { id: "my6bfA14vMQ", title: "Testify" },
        ],
      },
    ],
  },
  {
    name: "Red Hot Chili Peppers",
    photoUrl: "https://i.ytimg.com/vi/YlUKcNNmywk/default.jpg",
    albums: [
      {
        name: "Californication",
        year: "1999",
        coverUrl: "https://i.ytimg.com/vi/YlUKcNNmywk/mqdefault.jpg",
        songs: [
          { id: "YlUKcNNmywk", title: "Californication" },
          { id: "Mr_uHJPUlO8", title: "Scar Tissue" },
          { id: "YlUKcNNmywk", title: "Otherside" },
          { id: "Mr_uHJPUlO8", title: "Around the World" },
        ],
      },
      {
        name: "Stadium Arcadium",
        year: "2006",
        coverUrl: "https://i.ytimg.com/vi/8DyziWtkfBw/mqdefault.jpg",
        songs: [
          { id: "8DyziWtkfBw", title: "Dani California" },
          { id: "YlUKcNNmywk", title: "Snow (Hey Oh)" },
          { id: "Mr_uHJPUlO8", title: "Tell Me Baby" },
          { id: "8DyziWtkfBw", title: "Hump de Bump" },
        ],
      },
      {
        name: "Blood Sugar Sex Magik",
        year: "1991",
        coverUrl: "https://i.ytimg.com/vi/YlUKcNNmywk/mqdefault.jpg",
        songs: [
          { id: "YlUKcNNmywk", title: "Under the Bridge" },
          { id: "Mr_uHJPUlO8", title: "Give It Away" },
          { id: "8DyziWtkfBw", title: "Breaking the Girl" },
        ],
      },
    ],
  },
  {
    name: "Sithu Aye",
    photoUrl: "https://i.ytimg.com/vi/5OcMDq4k-CU/default.jpg",
    albums: [
      {
        name: "Set Course for Andromeda",
        year: "2014",
        coverUrl: "https://i.ytimg.com/vi/5OcMDq4k-CU/mqdefault.jpg",
        songs: [
          { id: "5OcMDq4k-CU", title: "Galaxies Collide" },
          { id: "MEHKzRkjLBY", title: "Set Course for Andromeda!" },
          { id: "5OcMDq4k-CU", title: "Messier Object" },
        ],
      },
      {
        name: "Invent the Universe",
        year: "2015",
        coverUrl: "https://i.ytimg.com/vi/5OcMDq4k-CU/mqdefault.jpg",
        songs: [
          { id: "5OcMDq4k-CU", title: "Footsteps" },
          { id: "MEHKzRkjLBY", title: "Constants and Variables" },
        ],
      },
    ],
  },
  {
    name: "Skrillex",
    photoUrl: "https://i.ytimg.com/vi/2cXDgFwE13g/default.jpg",
    albums: [
      {
        name: "Scary Monsters and Nice Sprites",
        year: "2010",
        coverUrl: "https://i.ytimg.com/vi/2cXDgFwE13g/mqdefault.jpg",
        songs: [
          { id: "2cXDgFwE13g", title: "Scary Monsters and Nice Sprites" },
          { id: "BGpzGu9Yp6Y", title: "Kill Everybody" },
          { id: "WSeNSzJ2-Jw", title: "Rock n' Roll (Will Take You to the Mountain)" },
        ],
      },
      {
        name: "Bangarang",
        year: "2011",
        coverUrl: "https://i.ytimg.com/vi/YJVmu6yttiw/mqdefault.jpg",
        songs: [
          { id: "YJVmu6yttiw", title: "Bangarang" },
          { id: "5Kod1q39ddE", title: "Breakn' a Sweat" },
          { id: "YJVmu6yttiw", title: "Kyoto" },
        ],
      },
      {
        name: "Recess",
        year: "2014",
        coverUrl: "https://i.ytimg.com/vi/eOofWzI3flA/mqdefault.jpg",
        songs: [
          { id: "eOofWzI3flA", title: "Recess" },
          { id: "BGpzGu9Yp6Y", title: "Ragga Bomb" },
          { id: "2cXDgFwE13g", title: "Try It Out" },
        ],
      },
    ],
  },
  {
    name: "Slowdive",
    photoUrl: "https://i.ytimg.com/vi/AMPpMfjnn-I/default.jpg",
    albums: [
      {
        name: "Souvlaki",
        year: "1993",
        coverUrl: "https://i.ytimg.com/vi/AMPpMfjnn-I/mqdefault.jpg",
        songs: [
          { id: "AMPpMfjnn-I", title: "Alison" },
          { id: "jkM3M3zGcGY", title: "When the Sun Hits" },
          { id: "FyYMKZj7AzI", title: "Souvlaki Space Station" },
          { id: "AMPpMfjnn-I", title: "Sing" },
          { id: "jkM3M3zGcGY", title: "Machine Gun" },
        ],
      },
      {
        name: "Slowdive",
        year: "2017",
        coverUrl: "https://i.ytimg.com/vi/AMPpMfjnn-I/mqdefault.jpg",
        songs: [
          { id: "AMPpMfjnn-I", title: "Star Roving" },
          { id: "jkM3M3zGcGY", title: "Don't Know Why" },
          { id: "FyYMKZj7AzI", title: "Sugar for the Pill" },
        ],
      },
    ],
  },
  {
    name: "Staind",
    photoUrl: "https://i.ytimg.com/vi/xBjiYZiv5RE/default.jpg",
    albums: [
      {
        name: "Break the Cycle",
        year: "2001",
        coverUrl: "https://i.ytimg.com/vi/xBjiYZiv5RE/mqdefault.jpg",
        songs: [
          { id: "xBjiYZiv5RE", title: "It's Been Awhile" },
          { id: "TP9luRtEqjc", title: "Fade" },
          { id: "GX1JNwmIf2k", title: "Outside" },
          { id: "xBjiYZiv5RE", title: "Epiphany" },
          { id: "TP9luRtEqjc", title: "Suffer" },
        ],
      },
      {
        name: "Dysfunction",
        year: "1999",
        coverUrl: "https://i.ytimg.com/vi/xBjiYZiv5RE/mqdefault.jpg",
        songs: [
          { id: "xBjiYZiv5RE", title: "Mudshovel" },
          { id: "TP9luRtEqjc", title: "Home" },
          { id: "GX1JNwmIf2k", title: "Just Go" },
        ],
      },
    ],
  },
  {
    name: "Swedish House Mafia",
    photoUrl: "https://i.ytimg.com/vi/ygGw_zo_W8A/default.jpg",
    albums: [
      {
        name: "Until One",
        year: "2010",
        coverUrl: "https://i.ytimg.com/vi/ygGw_zo_W8A/mqdefault.jpg",
        songs: [
          { id: "ygGw_zo_W8A", title: "One (Your Name)" },
          { id: "h6fcK_fRYaI", title: "Miami 2 Ibiza" },
          { id: "ygGw_zo_W8A", title: "Leave the World Behind" },
        ],
      },
      {
        name: "Until Now",
        year: "2012",
        coverUrl: "https://i.ytimg.com/vi/bV-hSgL1R74/mqdefault.jpg",
        songs: [
          { id: "bV-hSgL1R74", title: "Don't You Worry Child" },
          { id: "IQKsLOPK_ls", title: "Save the World" },
          { id: "bV-hSgL1R74", title: "Greyhound" },
          { id: "IQKsLOPK_ls", title: "Antidote" },
        ],
      },
      {
        name: "Paradise Again",
        year: "2022",
        coverUrl: "https://i.ytimg.com/vi/bV-hSgL1R74/mqdefault.jpg",
        songs: [
          { id: "bV-hSgL1R74", title: "Moth to a Flame" },
          { id: "IQKsLOPK_ls", title: "Lifetime" },
        ],
      },
    ],
  },
  {
    name: "System of a Down",
    photoUrl: "https://i.ytimg.com/vi/CSvFpBOe8eY/default.jpg",
    albums: [
      {
        name: "Toxicity",
        year: "2001",
        coverUrl: "https://i.ytimg.com/vi/CSvFpBOe8eY/mqdefault.jpg",
        songs: [
          { id: "CSvFpBOe8eY", title: "Chop Suey!" },
          { id: "iywaBOMvYLI", title: "Toxicity" },
          { id: "CSvFpBOe8eY", title: "Aerials" },
          { id: "iywaBOMvYLI", title: "ATWA" },
        ],
      },
      {
        name: "Mezmerize",
        year: "2005",
        coverUrl: "https://i.ytimg.com/vi/L-iepu3EtyE/mqdefault.jpg",
        songs: [
          { id: "L-iepu3EtyE", title: "B.Y.O.B." },
          { id: "CSvFpBOe8eY", title: "Question!" },
          { id: "iywaBOMvYLI", title: "Cigaro" },
        ],
      },
      {
        name: "System of a Down",
        year: "1998",
        coverUrl: "https://i.ytimg.com/vi/CSvFpBOe8eY/mqdefault.jpg",
        songs: [
          { id: "CSvFpBOe8eY", title: "Sugar" },
          { id: "iywaBOMvYLI", title: "Spiders" },
          { id: "L-iepu3EtyE", title: "Suite-Pee" },
        ],
      },
    ],
  },
  {
    name: "Tame Impala",
    photoUrl: "https://i.ytimg.com/vi/b0jqPvpn3sY/default.jpg",
    albums: [
      {
        name: "Currents",
        year: "2015",
        coverUrl: "https://i.ytimg.com/vi/b0jqPvpn3sY/mqdefault.jpg",
        songs: [
          { id: "b0jqPvpn3sY", title: "The Less I Know The Better" },
          { id: "wycjnCCgUes", title: "Let It Happen" },
          { id: "GHe8kKO8uds", title: "New Person, Same Old Mistakes" },
          { id: "odeHP8N4LKc", title: "Eventually" },
          { id: "b0jqPvpn3sY", title: "The Moment" },
        ],
      },
      {
        name: "Lonerism",
        year: "2012",
        coverUrl: "https://i.ytimg.com/vi/sBzrzS1Ag_g/mqdefault.jpg",
        songs: [
          { id: "sBzrzS1Ag_g", title: "Feels Like We Only Go Backwards" },
          { id: "pFptt7Cargc", title: "Elephant" },
          { id: "sBzrzS1Ag_g", title: "Mind Mischief" },
          { id: "pFptt7Cargc", title: "Apocalypse Dreams" },
        ],
      },
      {
        name: "The Slow Rush",
        year: "2020",
        coverUrl: "https://i.ytimg.com/vi/Rs-KtYd5_Kw/mqdefault.jpg",
        songs: [
          { id: "Rs-KtYd5_Kw", title: "Borderline" },
          { id: "HOGdYQi5uxY", title: "Lost in Yesterday" },
          { id: "Rs-KtYd5_Kw", title: "Breathe Deeper" },
          { id: "HOGdYQi5uxY", title: "It Might Be Time" },
        ],
      },
      {
        name: "Innerspeaker",
        year: "2010",
        coverUrl: "https://i.ytimg.com/vi/b0jqPvpn3sY/mqdefault.jpg",
        songs: [
          { id: "b0jqPvpn3sY", title: "Solitude Is Bliss" },
          { id: "wycjnCCgUes", title: "Desire Be Desire Go" },
        ],
      },
    ],
  },
  {
    name: "The Beatles",
    photoUrl: "https://i.ytimg.com/vi/NCtzkaL2t_Y/default.jpg",
    albums: [
      {
        name: "Abbey Road",
        year: "1969",
        coverUrl: "https://i.ytimg.com/vi/NCtzkaL2t_Y/mqdefault.jpg",
        songs: [
          { id: "NCtzkaL2t_Y", title: "Come Together" },
          { id: "fJ9rUzIMcZQ", title: "Something" },
          { id: "NCtzkaL2t_Y", title: "Here Comes the Sun" },
          { id: "fJ9rUzIMcZQ", title: "Oh! Darling" },
        ],
      },
      {
        name: "Sgt. Pepper's Lonely Hearts Club Band",
        year: "1967",
        coverUrl: "https://i.ytimg.com/vi/usNsCeOV4GM/mqdefault.jpg",
        songs: [
          { id: "usNsCeOV4GM", title: "Lucy in the Sky with Diamonds" },
          { id: "NCtzkaL2t_Y", title: "A Day in the Life" },
          { id: "fJ9rUzIMcZQ", title: "With a Little Help from My Friends" },
        ],
      },
      {
        name: "The Beatles (White Album)",
        year: "1968",
        coverUrl: "https://i.ytimg.com/vi/NCtzkaL2t_Y/mqdefault.jpg",
        songs: [
          { id: "NCtzkaL2t_Y", title: "While My Guitar Gently Weeps" },
          { id: "fJ9rUzIMcZQ", title: "Blackbird" },
          { id: "usNsCeOV4GM", title: "Back in the U.S.S.R." },
        ],
      },
      {
        name: "Let It Be",
        year: "1970",
        coverUrl: "https://i.ytimg.com/vi/QDYfEBY9NM4/mqdefault.jpg",
        songs: [
          { id: "QDYfEBY9NM4", title: "Let It Be" },
          { id: "NCtzkaL2t_Y", title: "Get Back" },
          { id: "fJ9rUzIMcZQ", title: "The Long and Winding Road" },
        ],
      },
    ],
  },
  {
    name: "Tom Petty",
    photoUrl: "https://i.ytimg.com/vi/nvlTJrNJ5lA/default.jpg",
    albums: [
      {
        name: "Full Moon Fever",
        year: "1989",
        coverUrl: "https://i.ytimg.com/vi/nvlTJrNJ5lA/mqdefault.jpg",
        songs: [
          { id: "nvlTJrNJ5lA", title: "Free Fallin'" },
          { id: "Y5fBdpreJiU", title: "I Won't Back Down" },
          { id: "aowSGxim_O8", title: "Runnin' Down a Dream" },
          { id: "h0JvF9vpqx8", title: "Yer So Bad" },
        ],
      },
      {
        name: "Damn the Torpedoes",
        year: "1979",
        coverUrl: "https://i.ytimg.com/vi/oqLKOxYgN_U/mqdefault.jpg",
        songs: [
          { id: "oqLKOxYgN_U", title: "Refugee" },
          { id: "s5BJXwNeKsQ", title: "Don't Do Me Like That" },
          { id: "oqLKOxYgN_U", title: "Here Comes My Girl" },
        ],
      },
      {
        name: "Greatest Hits",
        year: "1993",
        coverUrl: "https://i.ytimg.com/vi/Yd60nI4sa9A/mqdefault.jpg",
        songs: [
          { id: "Yd60nI4sa9A", title: "Mary Jane's Last Dance" },
          { id: "nvlTJrNJ5lA", title: "American Girl" },
          { id: "Y5fBdpreJiU", title: "Learning to Fly" },
        ],
      },
    ],
  },
  {
    name: "Tool",
    photoUrl: "https://i.ytimg.com/vi/UhjG47gtMCo/default.jpg",
    albums: [
      {
        name: "Ænima",
        year: "1996",
        coverUrl: "https://i.ytimg.com/vi/UhjG47gtMCo/mqdefault.jpg",
        songs: [
          { id: "UhjG47gtMCo", title: "Stinkfist" },
          { id: "f8aT9oRp95A", title: "Ænema" },
          { id: "UhjG47gtMCo", title: "Forty Six & 2" },
          { id: "f8aT9oRp95A", title: "H." },
        ],
      },
      {
        name: "Lateralus",
        year: "2001",
        coverUrl: "https://i.ytimg.com/vi/wS7CZIJVxFY/mqdefault.jpg",
        songs: [
          { id: "wS7CZIJVxFY", title: "Schism" },
          { id: "Y7JG63IuaWs", title: "Lateralus" },
          { id: "wS7CZIJVxFY", title: "Parabola" },
          { id: "Y7JG63IuaWs", title: "The Patient" },
        ],
      },
      {
        name: "10,000 Days",
        year: "2006",
        coverUrl: "https://i.ytimg.com/vi/qJq9y9xPKWs/mqdefault.jpg",
        songs: [
          { id: "qJq9y9xPKWs", title: "Vicarious" },
          { id: "EgAEFUYKYzg", title: "The Pot" },
          { id: "qJq9y9xPKWs", title: "Jambi" },
        ],
      },
    ],
  },
  {
    name: "U2",
    photoUrl: "https://i.ytimg.com/vi/co6WMzDOh1o/default.jpg",
    albums: [
      {
        name: "The Joshua Tree",
        year: "1987",
        coverUrl: "https://i.ytimg.com/vi/co6WMzDOh1o/mqdefault.jpg",
        songs: [
          { id: "co6WMzDOh1o", title: "With or Without You" },
          { id: "ftjEcrrf7r0", title: "Where the Streets Have No Name" },
          { id: "ujNeHIo7oTE", title: "I Still Haven't Found What I'm Looking For" },
          { id: "co6WMzDOh1o", title: "Bullet the Blue Sky" },
          { id: "ftjEcrrf7r0", title: "Running to Stand Still" },
        ],
      },
      {
        name: "Achtung Baby",
        year: "1991",
        coverUrl: "https://i.ytimg.com/vi/98W9QuMq-2k/mqdefault.jpg",
        songs: [
          { id: "98W9QuMq-2k", title: "One" },
          { id: "e3-5YC_oHjE", title: "Mysterious Ways" },
          { id: "98W9QuMq-2k", title: "Until the End of the World" },
          { id: "e3-5YC_oHjE", title: "The Fly" },
        ],
      },
      {
        name: "All That You Can't Leave Behind",
        year: "2000",
        coverUrl: "https://i.ytimg.com/vi/co6WMzDOh1o/mqdefault.jpg",
        songs: [
          { id: "co6WMzDOh1o", title: "Beautiful Day" },
          { id: "ftjEcrrf7r0", title: "Stuck in a Moment" },
          { id: "ujNeHIo7oTE", title: "Elevation" },
        ],
      },
    ],
  },
]
