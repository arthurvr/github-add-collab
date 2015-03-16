#!/usr/bin/env node
'use strict';

var meow = require('meow');
var githubAddCollab = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ github-add-collab <user> <repos>',
		'',
		'Example',
		'  $ github-add-collab johndoe github-add-collab yeoman/yo --token 523ef69119',
		'  $ github-add-collab johndoe --add-to-all --token 523ef69119',
		'Options',
		'  -a, --add-to-all    Add to all repositories',
		'  -t, --token         Github token to authenticate with'
	].join('\n')
}, {
	boolean: ['add-to-all'],
	string: ['token'],
	alias: {
		a: 'add-to-all',
		t: 'token'
	}
});

var user = cli.input.shift();
var repos = cli.input;

githubAddCollab(user, repos, cli.flags, function (err, data) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}

	console.log('Added user ' + user + ' to ' + data.length + ' repositories');
});