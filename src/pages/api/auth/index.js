// mock users db
let users = {
  t: {
    password: 't',
  },
  tylermcginnis: {
    password: 'abc321',
  },
  mtsamis: {
    password: 'xyz123',
  },
  zoshikanlu: {
    password: 'pass246',
  }
}

// mock getUserDetails api
const getUserDetails = (username) => {
  const users = {
    t: {
      id: 't',
      name: 'Amandeep Singh',
      avatarURL: '/images/1.png',
      answers: {
        "8xf0y6ziyjabvozdd253nd": 'optionOne',
        "6ni6ok3ym7mf1p33lnez": 'optionOne',
        "am8ehyc8byjqgar0jgpub9": 'optionTwo',
        "loxhs1bqm25b708cmbf3g": 'optionTwo'
      },
      questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    },
    tylermcginnis: {
      id: 'tylermcginnis',
      name: 'Tyler McGinnis',
      avatarURL: '/images/2.jpeg',
      answers: {
        "vthrdm985a262al8qx3do": 'optionOne',
        "xj352vofupe1dqz9emx13r": 'optionTwo',
      },
      questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
    mtsamis: {
      id: 'mtsamis',
      name: 'Mike Tsamis',
      avatarURL: '/images/3.jpeg',
      answers: {
        "xj352vofupe1dqz9emx13r": 'optionOne',
        "vthrdm985a262al8qx3do": 'optionTwo',
        "6ni6ok3ym7mf1p33lnez": 'optionOne'
      },
      questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
    },
    zoshikanlu: {
      id: 'zoshikanlu',
      name: 'Zenobia Oshikanlu',
      avatarURL: '/images/4.jpeg',
      answers: {
        "xj352vofupe1dqz9emx13r": 'optionOne',
      },
      questions: [],
    }
  };

  return users[username];
}

function login({ username, password }) {
  if (username && users[username] && users[username].password === password) {
    return {
      user: getUserDetails(username)
    };
  } else {
    return {
      error: 'Invalid username or password'
    };
  }
}

export default function handler(req, res) {
  const result = login(req.body);
  res.setHeader('Set-Cookie', ('swr-auth-token', result.user ? result.user.id : ''));
  res.status(200).json(result)
}