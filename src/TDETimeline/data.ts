// TDE (Top Dawg Entertainment) History Data
export type TDEEvent = {
  year: number;
  title: string;
  description: string;
  type: 'founding' | 'signing' | 'release' | 'milestone' | 'departure';
};

export const tdeEvents: TDEEvent[] = [
  {
    year: 2004,
    title: 'TDE Founded',
    description: 'Anthony "Top Dawg" Tiffith establishes Top Dawg Entertainment in Watts, Los Angeles',
    type: 'founding',
  },
  {
    year: 2005,
    title: 'Jay Rock Signs',
    description: 'Jay Rock becomes the first artist signed to TDE',
    type: 'signing',
  },
  {
    year: 2005,
    title: 'Kendrick Lamar Signs',
    description: 'Kendrick Lamar joins TDE just two weeks after Jay Rock',
    type: 'signing',
  },
  {
    year: 2007,
    title: 'Ab-Soul Signs',
    description: 'Ab-Soul joins the TDE roster, completing the core foundation',
    type: 'signing',
  },
  {
    year: 2009,
    title: 'ScHoolboy Q Signs',
    description: 'ScHoolboy Q officially signs after being affiliated since 2006',
    type: 'signing',
  },
  {
    year: 2009,
    title: 'Black Hippy Forms',
    description: 'Jay Rock, Kendrick, Ab-Soul & ScHoolboy Q form the supergroup Black Hippy',
    type: 'milestone',
  },
  {
    year: 2011,
    title: 'Section.80',
    description: 'Kendrick Lamar releases Section.80, putting TDE on the map',
    type: 'release',
  },
  {
    year: 2012,
    title: 'Aftermath Deal',
    description: 'TDE signs joint venture with Aftermath Entertainment & Interscope Records',
    type: 'milestone',
  },
  {
    year: 2012,
    title: 'good kid, m.A.A.d city',
    description: 'Kendrick releases his major label debut, a critical and commercial breakthrough',
    type: 'release',
  },
  {
    year: 2013,
    title: 'SZA Signs',
    description: 'SZA becomes the first female artist signed to TDE',
    type: 'signing',
  },
  {
    year: 2013,
    title: 'Isaiah Rashad Signs',
    description: 'Isaiah Rashad joins TDE, first artist signed from outside California',
    type: 'signing',
  },
  {
    year: 2015,
    title: 'To Pimp A Butterfly',
    description: 'Kendrick releases the critically acclaimed To Pimp A Butterfly',
    type: 'release',
  },
  {
    year: 2016,
    title: 'Lance Skiiiwalker Signs',
    description: 'Singer Lance Skiiiwalker joins the TDE family',
    type: 'signing',
  },
  {
    year: 2017,
    title: 'SiR Signs',
    description: 'R&B artist SiR officially joins TDE',
    type: 'signing',
  },
  {
    year: 2017,
    title: 'CTRL',
    description: 'SZA releases CTRL, becoming a defining R&B album of the decade',
    type: 'release',
  },
  {
    year: 2017,
    title: 'DAMN.',
    description: 'Kendrick releases DAMN., winning the Pulitzer Prize for Music',
    type: 'release',
  },
  {
    year: 2022,
    title: 'Kendrick Departs',
    description: 'Kendrick Lamar releases Mr. Morale and leaves TDE after 17 years',
    type: 'departure',
  },
  {
    year: 2022,
    title: 'Doechii Signs',
    description: 'Doechii joins through Capitol Records partnership',
    type: 'signing',
  },
  {
    year: 2023,
    title: 'SOS',
    description: 'SZA releases SOS, becoming one of the best-selling albums of the year',
    type: 'release',
  },
];

export const getEventColor = (type: TDEEvent['type']): string => {
  switch (type) {
    case 'founding':
      return '#FF0000';
    case 'signing':
      return '#DC143C';
    case 'release':
      return '#8B0000';
    case 'milestone':
      return '#B22222';
    case 'departure':
      return '#4A0000';
    default:
      return '#FF0000';
  }
};
