const boards = [
  {
    "worksafe": true,
    "name": "Anime & Manga",
    "code": "a"
  },
  {
    "worksafe": true,
    "name": "Anime/Cute",
    "code": "c"
  },
  {
    "worksafe": true,
    "name": "Anime/Wallpapers",
    "code": "w"
  },
  {
    "worksafe": true,
    "name": "Mecha",
    "code": "m"
  },
  {
    "worksafe": true,
    "name": "Cosplay & EGL",
    "code": "cgl"
  },
  {
    "worksafe": true,
    "name": "Cute/Male",
    "code": "cm"
  },
  {
    "worksafe": true,
    "name": "Flash",
    "code": "f"
  },
  {
    "worksafe": true,
    "name": "Transportation",
    "code": "n"
  },
  {
    "worksafe": true,
    "name": "Otaku Culture",
    "code": "jp"
  },
  {
    "worksafe": true,
    "name": "Virtual YouTubers",
    "code": "vt"
  },
  {
    "worksafe": true,
    "name": "Video Games",
    "code": "v"
  },
  {
    "worksafe": true,
    "name": "Video Game Generals",
    "code": "vg"
  },
  {
    "worksafe": true,
    "name": "Video Games/Multiplayer",
    "code": "vm"
  },
  {
    "worksafe": true,
    "name": "Video Games/Mobile",
    "code": "vmg"
  },
  {
    "worksafe": true,
    "name": "Pokémon",
    "code": "vp"
  },
  {
    "worksafe": true,
    "name": "Retro Games",
    "code": "vr"
  },
  {
    "worksafe": true,
    "name": "Video Games/RPG",
    "code": "vrpg"
  },
  {
    "worksafe": true,
    "name": "Video Games/Strategy",
    "code": "vst"
  },
  {
    "worksafe": true,
    "name": "Comics & Cartoons",
    "code": "co"
  },
  {
    "worksafe": true,
    "name": "Technology",
    "code": "g"
  },
  {
    "worksafe": true,
    "name": "Television & Film",
    "code": "tv"
  },
  {
    "worksafe": true,
    "name": "Weapons",
    "code": "k"
  },
  {
    "worksafe": true,
    "name": "Auto",
    "code": "o"
  },
  {
    "worksafe": true,
    "name": "Animals & Nature",
    "code": "an"
  },
  {
    "worksafe": true,
    "name": "Traditional Games",
    "code": "tg"
  },
  {
    "worksafe": true,
    "name": "Sports",
    "code": "sp"
  },
  {
    "worksafe": true,
    "name": "Extreme Sports",
    "code": "xs"
  },
  {
    "worksafe": true,
    "name": "Professional Wrestling",
    "code": "pw"
  },
  {
    "worksafe": true,
    "name": "Science & Math",
    "code": "sci"
  },
  {
    "worksafe": true,
    "name": "History & Humanities",
    "code": "his"
  },
  {
    "worksafe": true,
    "name": "International",
    "code": "int"
  },
  {
    "worksafe": true,
    "name": "Outdoors",
    "code": "out"
  },
  {
    "worksafe": true,
    "name": "Toys",
    "code": "toy"
  },
  {
    "worksafe": true,
    "name": "Oekaki",
    "code": "i"
  },
  {
    "worksafe": true,
    "name": "Papercraft & Origami",
    "code": "po"
  },
  {
    "worksafe": true,
    "name": "Photography",
    "code": "p"
  },
  {
    "worksafe": true,
    "name": "Food & Cooking",
    "code": "ck"
  },
  {
    "worksafe": true,
    "name": "Artwork/Critique",
    "code": "ic"
  },
  {
    "worksafe": true,
    "name": "Wallpapers/General",
    "code": "wg"
  },
  {
    "worksafe": true,
    "name": "Literature",
    "code": "lit"
  },
  {
    "worksafe": true,
    "name": "Music",
    "code": "mu"
  },
  {
    "worksafe": true,
    "name": "Fashion",
    "code": "fa"
  },
  {
    "worksafe": true,
    "name": "3DCG",
    "code": "3"
  },
  {
    "worksafe": true,
    "name": "Graphic Design",
    "code": "gd"
  },
  {
    "worksafe": true,
    "name": "Do-It-Yourself",
    "code": "diy"
  },
  {
    "worksafe": true,
    "name": "Worksafe GIF",
    "code": "wsg"
  },
  {
    "worksafe": true,
    "name": "Quests",
    "code": "qst"
  },
  {
    "worksafe": true,
    "name": "Business & Finance",
    "code": "biz"
  },
  {
    "worksafe": true,
    "name": "Travel",
    "code": "trv"
  },
  {
    "worksafe": true,
    "name": "Fitness",
    "code": "fit"
  },
  {
    "worksafe": true,
    "name": "Paranormal",
    "code": "x"
  },
  {
    "worksafe": true,
    "name": "Advice",
    "code": "adv"
  },
  {
    "worksafe": true,
    "name": "LGBT",
    "code": "lgbt"
  },
  {
    "worksafe": true,
    "name": "Pony",
    "code": "mlp"
  },
  {
    "worksafe": true,
    "name": "Current News",
    "code": "news"
  },
  {
    "worksafe": true,
    "name": "Worksafe Requests",
    "code": "wsr"
  },
  {
    "worksafe": true,
    "name": "Very Important Posts",
    "code": "vip"
  },
  {
    "worksafe": false,
    "name": "Random",
    "code": "b"
  },
  {
    "worksafe": false,
    "name": "ROBOT9001",
    "code": "r9k"
  },
  {
    "worksafe": false,
    "name": "Politically Incorrect",
    "code": "pol"
  },
  {
    "worksafe": false,
    "name": "International/Random",
    "code": "bant"
  },
  {
    "worksafe": false,
    "name": "Cams & Meetups",
    "code": "soc"
  },
  {
    "worksafe": false,
    "name": "Shit 4chan Says",
    "code": "s4s"
  },
  {
    "worksafe": false,
    "name": "Sexy Beautiful Women",
    "code": "s"
  },
  {
    "worksafe": false,
    "name": "Hardcore",
    "code": "hc"
  },
  {
    "worksafe": false,
    "name": "Handsome Men",
    "code": "hm"
  },
  {
    "worksafe": false,
    "name": "Hentai",
    "code": "h"
  },
  {
    "worksafe": false,
    "name": "Ecchi",
    "code": "e"
  },
  {
    "worksafe": false,
    "name": "Yuri",
    "code": "u"
  },
  {
    "worksafe": false,
    "name": "Hentai/Alternative",
    "code": "d"
  },
  {
    "worksafe": false,
    "name": "Yaoi",
    "code": "y"
  },
  {
    "worksafe": false,
    "name": "Torrents",
    "code": "t"
  },
  {
    "worksafe": false,
    "name": "High Resolution",
    "code": "hr"
  },
  {
    "worksafe": false,
    "name": "Adult GIF",
    "code": "gif"
  },
  {
    "worksafe": false,
    "name": "Adult Cartoons",
    "code": "aco"
  },
  {
    "worksafe": false,
    "name": "Adult Requests",
    "code": "r"
  },
  {
    "worksafe": false,
    "name": "Off-Topic",
    "code": "trash"
  },
];
module.exports = boards;
