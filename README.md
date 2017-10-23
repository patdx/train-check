  # developing
  
  yarn start
    Starts the development server.

  yarn build
    Bundles the app into static files for production.

  yarn test
    Starts the test runner.

  yarn eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd train-check-client-v3
  yarn start

# deploying

Using now.sh. While now.sh supports static sites, it doesn't support single-page applications in this mode. So now.sh is running in "node" mode.

```
now
now alias
// go to https://train-check.now.sh/
```

# deploying (old)

```
yarn build
aero deploy
// go to https://train-check-3.aerobatic.io
```

## where to deploy

For now, I'm using now.sh. But the cold boot time seems really slow? There are also these options:

- now.sh 
- surge
- gitlab
- https://www.netlify.com/features/
- aerobatic (not free after trial)

## iphone/ios recognitions

Here are some times on splash screens: https://gist.github.com/tfausak/2222823

## future updates

It would be nice to use the zeit next.js library to optimize for server-side rendering.