function Iguana_addcoinLogin(addcoin_data) {
	var tmpinternval = 0,
			logincoinfullname = '',
			logincoinmodeinfo = '';

	if ( addcoin_data.coin == 'BTC' ) {
		logincoinfullname = 'Bitcoin';
		logincoinmodeinfo = '';

		if ( addcoin_data.mode == '1' ) {
			logincoinmodeinfo = 'Full';
		} else {
			logincoinmodeinfo = 'Basilisk';
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				AddCoinData = {
					'userpass': tmpIguanaRPCAuth,
					'prefetchlag': 5,
					'poll': 1,
					'active': 1,
					'agent': "iguana",
					'method': "addcoin",
					'newcoin': "BTC",
					'startpend': 64,
					'endpend': 2,
					'services': 128,
					'maxpeers': 512,
					'RELAY': addcoin_data.mode,
					'VALIDATE': addcoin_data.mode,
					'portp2p': 8333
				};
	}
	if ( addcoin_data.coin == 'BTCD' ) {
			logincoinfullname = 'BitcoinDark';
			logincoinmodeinfo = '';

			if ( addcoin_data.mode == '1' ) {
				logincoinmodeinfo = 'Full';
			} else {
				logincoinmodeinfo = 'Basilisk';
			}

			var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
					AddCoinData = {
						'userpass': tmpIguanaRPCAuth,
						'prefetchlag': -1,
						'poll': 50,
						'active': 1,
						'agent': 'iguana',
						'method': 'addcoin',
						'newcoin': 'BTCD',
						'startpend': 8,
						'endpend': 4,
						'services': 129,
						'maxpeers': 64,
						'RELAY': addcoin_data.mode,
						'VALIDATE': addcoin_data.mode,
						'portp2p': 14631,
						'rpc': 14632
					};
	}

	if ( addcoin_data.coin == 'KMD' ) {
		logincoinfullname = 'Komodo';
		logincoinmodeinfo = '';

		if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; }
		if ( addcoin_data.mode == '0' ) { logincoinmodeinfo = 'Basilisk'; }
		if ( addcoin_data.mode == '-1' ) {
			logincoinmodeinfo = 'Native';
			var confpath = Shepherd_getConf('komodod');
			console.log(confpath[0].path);
		}
		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

		if ( addcoin_data.mode == '-1' ) {
			var setconfig = function() {
				return new Promise(function(resolve, reject) {
					Shepherd_setConf('komodod');
					var result = 'setconfig: DONE';
					console.log(result);
					resolve(result);
				});
			}

			var startcoin = function() {
				return new Promise(function(resolve, reject) {
					Shepherd_herd('komodod', {
						'ac_name': 'komodod',
						'ac_options': [
							'-daemon=0',
							'-addnode=78.47.196.146'
						]
					});
					var result = 'startcoin: DONE';
					console.log(result);
					resolve(result);
				});
			}

			setconfig()
			.then(function(result) {
				return startcoin();
			});
			var tmpinternval = 6000,
			AddCoinData = {"conf":"komodo.conf","path":confpath[0].path,"unitval":"20","zcash":1,"RELAY":-1,"VALIDATE":0,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","startpend":8,"endpend":8,"services":0,"maxpeers":32,"newcoin":"KMD","name":"Komodo","hasheaders":1,"useaddmultisig":0,"netmagic":"f9eee48d","p2p":7770,"rpc":7771,"pubval":60,"p2shval":85,"wifval":188,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71","protover":170002,"genesisblock":"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2","debug":0}
		} else {
			var AddCoinData = {'userpass':tmpIguanaRPCAuth,"unitval":"20","zcash":1,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","startpend":32,"endpend":32,"services":129,"maxpeers":32,"newcoin":"KMD","name":"Komodo","hasheaders":1,"useaddmultisig":0,"netmagic":"f9eee48d","p2p":7770,"rpc":7771,"pubval":60,"p2shval":85,"wifval":188,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71","protover":170002,"genesisblock":"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2","debug":0}
		}
	}
	if ( addcoin_data.coin == 'SUPERNET' ) {
		logincoinfullname = 'SUPERNET';
		logincoinmodeinfo = '';

		if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; }
		if ( addcoin_data.mode == '0' ) { logincoinmodeinfo = 'Basilisk'; }
		if ( addcoin_data.mode == '-1' ) {
			logincoinmodeinfo = 'Native';
			var confpath = Shepherd_getConf('SUPERNET');
			console.log(confpath[0].path);
		}
		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

		if ( addcoin_data.mode == '-1' ) {
			var setconfig = function() {
				return new Promise(function(resolve, reject) {
					Shepherd_setConf('SUPERNET');
					var result = 'setconfig: DONE';
					console.log(result);
					resolve(result);
				});
			}

			var startcoin = function() {
				return new Promise(function(resolve, reject) {
					Shepherd_herd('komodod', {
							'ac_name': 'SUPERNET',
							'ac_options': [
              				'-daemon=0',
							'-server',
							'-ac_name=SUPERNET',
							'-ac_supply=816061',
							'-addnode=78.47.196.146'
						]
					});

					var result = 'startcoin: DONE';
					console.log(result);
					resolve(result);
				});
			}

			setconfig()
			.then(function(result) {
				return startcoin();
			});

			var tmpinternval = 6000,
					AddCoinData = {"conf":"SUPERNET.conf","path":confpath[0].path,"unitval":"20","zcash":1,"RELAY":-1,"VALIDATE":0,"prefetchlag":-1,"poll":100,"active":1,"agent":"iguana","method":"addcoin","startpend":4,"endpend":4,"services":129,"maxpeers":32,"newcoin":"SUPERNET","name":"SUPERNET","hasheaders":1,"useaddmultisig":0,"netmagic":"cc55d9d4","p2p":11340,"rpc":11341,"pubval":60,"p2shval":85,"wifval":188,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71","protover":170002,"genesisblock":"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2","debug":0,"seedipaddr":"78.47.196.146"}
		} else {
			var AddCoinData = {'userpass':tmpIguanaRPCAuth,"unitval":"20","zcash":1,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"prefetchlag":-1,"poll":100,"active":1,"agent":"iguana","method":"addcoin","startpend":4,"endpend":4,"services":129,"maxpeers":32,"newcoin":"SUPERNET","name":"SUPERNET","hasheaders":1,"useaddmultisig":0,"netmagic":"cc55d9d4","p2p":11340,"rpc":11341,"pubval":60,"p2shval":85,"wifval":188,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71","protover":170002,"genesisblock":"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2","debug":0,"seedipaddr":"78.47.196.146"}
		}
	}
	setTimeout(function() {
		$.ajax({
			type: 'POST',
			data: JSON.stringify(AddCoinData),
			url: 'http://127.0.0.1:' + config.iguanaPort,
			success: function(data, textStatus, jqXHR) {
				var addcoinData = JSON.parse(data);

				if (addcoinData.result === 'coin added') {
					console.log('coin added');
					toastr.success(logincoinfullname + ' ' + _lang[defaultLang].TOASTR.STARTED_IN + ' ' + logincoinmodeinfo + ' ' + _lang[defaultLang].TOASTR.MODE, COIN_NOTIFICATION);
					//if ( sessionStorage.getItem('IguanaActiveAccount') === null ) {
						$( '.login-form' ).submit();
						console.log('There was no wallet logged in. Logged in now.');
					//}
				} else if (addcoinData.result === 'coin already there') {
					console.log('coin already there');
					toastr.info(_lang[defaultLang].TOASTR.LOOKS_LIKE + ' ' + logincoinfullname + ' ' + _lang[defaultLang].TOASTR.ALREADY_RUNNING + '.', COIN_NOTIFICATION);
				} else if (addcoinData.result === null) {
					console.log('coin already there');
					toastr.info(_lang[defaultLang].TOASTR.LOOKS_LIKE + ' ' + logincoinfullname + ' ' + _lang[defaultLang].TOASTR.ALREADY_RUNNING + '.', COIN_NOTIFICATION);
				}
			},
			error: function(xhr, textStatus, error) {
				console.log(xhr.statusText);
				if ( xhr.readyState == 0 ) {
					Iguana_ServiceUnavailable();
				}
				console.log(textStatus);
				console.log(error);
			}
		});
	}, tmpinternval);
}

function Iguana_addcoin(addcoin_data) {
	var tmpinternval = 0,
			logincoinfullname = '',
			logincoinmodeinfo = '';

	if ( addcoin_data.coin == 'BTC' ) {
		logincoinfullname = 'Bitcoin';

		if ( addcoin_data.mode == '1' ) {
			logincoinmodeinfo = 'Full';
		} else {
			logincoinmodeinfo = 'Basilisk';
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				AddCoinData = {'userpass':tmpIguanaRPCAuth,"prefetchlag":5,"poll":1,"active":1,"agent":"iguana","method":"addcoin","newcoin":"BTC","startpend":64,"endpend":2,"services":128,"maxpeers":512,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"portp2p":8333}
	}
	if ( addcoin_data.coin == 'BTCD' ) {
		logincoinfullname = 'BitcoinDark';

		if ( addcoin_data.mode == '1' ) {
			logincoinmodeinfo = 'Full';
		} else {
			logincoinmodeinfo = 'Basilisk';
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				AddCoinData = {'userpass':tmpIguanaRPCAuth,"prefetchlag":-1,"poll":50,"active":1,"agent":"iguana","method":"addcoin","newcoin":"BTCD","startpend":8,"endpend":4,"services":129,"maxpeers":64,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"portp2p":14631,"rpc":14632}
	}
	if ( addcoin_data.coin == 'LTC' ) {
		logincoinfullname = 'Litecoin';

		if ( addcoin_data.mode == '1' ) {
			logincoinmodeinfo = 'Full';
		} else {
			logincoinmodeinfo = 'Basilisk';
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				AddCoinData = {'userpass':tmpIguanaRPCAuth,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","startpend":8,"endpend":8,"services":129,"maxpeers":256,"newcoin":"LTC","name":"Litecoin","hasheaders":1,"useaddmultisig":0,"netmagic":"fbc0b6db","p2p":9333,"rpc":9332,"pubval":48,"p2shval":5,"wifval":176,"txfee_satoshis":"100000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"12a765e31ffd4059bada1e25190f6e98c99d9714d334efa41a195a7e7e04bfe2","genesis":{"hashalgo":"scrypt","version":1,"timestamp":1317972665,"nBits":"1e0ffff0","nonce":2084524493,"merkle_root":"97ddfbbae6be97fd6cdf3e7ca13232a3afff2353e29badfab7f73011edd4ced9"},"alertpubkey":"040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9","protover":70002}
	}
	if ( addcoin_data.coin == 'DOGE' ) {
		logincoinfullname = 'Dogecoin';

		if ( addcoin_data.mode == '1' ) {
			logincoinmodeinfo = 'Full';
		} else {
			logincoinmodeinfo = 'Basilisk';
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@'+sessionStorage.getItem('IguanaRPCAuth'),
				AddCoinData = {'userpass':tmpIguanaRPCAuth,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"startpend":8,"endpend":4,"services":129,"auxpow":1,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"DOGE","name":"Dogecoin","netmagic":"C0C0C0C0","p2p":22556,"rpc":22555,"pubval":30,"p2shval":5,"wifval":128,"txfee_satoshis":"100000000","minconfirms":2,"genesishash":"1a91e3dace36e2be3bf030a65679fe821aa1d6ef92e7c9902eb318182c355691","genesis":{"hashalgo": "scrypt","version":1,"timestamp":1386325540,"nBits":"1e0ffff0","nonce":99943,"merkle_root":"5b2a3f53f605d62c53e62932dac6925e3d74afa5a4b459745c36d42d0ed26a69"},"alertpubkey":"04d4da7a5dae4db797d9b0644d57a5cd50e05a70f36091cd62e2fc41c98ded06340be5a43a35e185690cd9cde5d72da8f6d065b499b06f51dcfba14aad859f443a"}
	}
	if ( addcoin_data.coin == 'DGB' ) {
		logincoinfullname = 'Digibyte';

		if ( addcoin_data.mode == '1' ) {
			logincoinmodeinfo = 'Full';
		} else {
			logincoinmodeinfo = 'Basilisk';
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				AddCoinData = {'userpass':tmpIguanaRPCAuth,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"startpend":16,"endpend":8,"services":129,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"DGB","name":"Digibyte","netmagic":"FAC3B6DA","p2p":12024,"rpc":14022,"pubval":30,"p2shval":5,"wifval":128,"txfee_satoshis":"10000","minconfirms":2,"genesishash":"7497ea1b465eb39f1c8f507bc877078fe016d6fcb6dfad3a64c98dcc6e1e8496","genesis":{"version":1,"timestamp":1389388394,"nBits":"1e0ffff0","nonce":2447652,"merkle_root":"72ddd9496b004221ed0557358846d9248ecd4c440ebd28ed901efc18757d0fad"},"alertpubkey":"04F04441C4757F356290A37C313C3772C5BC5003E898EB2E0CF365795543A7BF690C8BBBFA32EE3A3325477CE2000B7D0453EFBB203329D0F9DF34D5927D022BC9"}
	}
	if ( addcoin_data.coin == 'MZC' ) {
		logincoinfullname = 'MazaCoin';

		if ( addcoin_data.mode == '1' ) {
			logincoinmodeinfo = 'Full';
		} else {
			logincoinmodeinfo = 'Basilisk';
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				AddCoinData = {'userpass':tmpIguanaRPCAuth,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"services":129,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"MZC","name":"MazaCoin","netmagic":"f8b503df","p2p":12835,"rpc":12832,"pubval":50,"p2shval":9,"wifval":224,"txfee_satoshis":"0","minconfirms":2,"genesishash":"00000c7c73d8ce604178dae13f0fc6ec0be3275614366d44b1b4b5c6e238c60c","genesis":{"version":1,"timestamp":1390747675,"nBits":"1e0ffff0","nonce":2091390249,"merkle_root":"62d496378e5834989dd9594cfc168dbb76f84a39bbda18286cddc7d1d1589f4f"},"alertpubkey":"04f09702847840aaf195de8442ebecedf5b095cdbb9bc716bda9110971b28a49e0ead8564ff0db22209e0374782c093bb899692d524e9d6a6956e7c5ecbcd68284"}
	}
	if ( addcoin_data.coin == 'SYS' ) {
		logincoinfullname = 'SysCoin';

		if ( addcoin_data.mode == '1' ) {
			logincoinmodeinfo = 'Full';
		} else {
			logincoinmodeinfo = 'Basilisk';
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				AddCoinData = {'userpass':tmpIguanaRPCAuth,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","startpend":18,"endpend":18,"services":129,"maxpeers":256,"newcoin":"SYS","name":"SysCoin","hasheaders":0,"useaddmultisig":0,"netmagic":"f9beb4d9","p2p":8369,"rpc":8370,"pubval":0,"p2shval":5,"wifval":128,"txfee_satoshis":"100000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"0000072d66e51ab87de265765cc8bdd2d229a4307c672a1b3d5af692519cf765","genesis":{"version":1,"timestamp":1450473723,"nBits":"1e0ffff0","nonce":5258726,"merkle_root":"5215c5a2af9b63f2550b635eb2b354bb13645fd8fa31275394eb161944303065"},"protover":70012,"auxpow":1}
	}
	if ( addcoin_data.coin == 'UNO' ) {
		logincoinfullname = 'Unobtanium';

		if ( addcoin_data.mode == '1' ) {
			logincoinmodeinfo = 'Full';
		} else {
			logincoinmodeinfo = 'Basilisk';
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				AddCoinData = {'userpass':tmpIguanaRPCAuth,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"services":129,"auxpow":1,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"UNO","name":"Unobtanium","netmagic":"03d5b503","p2p":65534,"rpc":65535,"pubval":130,"p2shval":30,"wifval":224,"txfee_satoshis":"1000000","minconfirms":2,"genesishash":"000004c2fc5fffb810dccc197d603690099a68305232e552d96ccbe8e2c52b75","genesis":{"version":1,"timestamp":1375548986,"nBits":"1e0fffff","nonce":1211565,"merkle_root":"36a192e90f70131a884fe541a1e8a5643a28ba4cb24cbb2924bd0ee483f7f484"},"alertpubkey":"04fd68acb6a895f3462d91b43eef0da845f0d531958a858554feab3ac330562bf76910700b3f7c29ee273ddc4da2bb5b953858f6958a50e8831eb43ee30c32f21d"}
	}
	if ( addcoin_data.coin == 'ZET' ) {
		logincoinfullname = 'Zetacoin';

		if ( addcoin_data.mode == '1' ) {
			logincoinmodeinfo = 'Full';
		} else {
			logincoinmodeinfo = 'Basilisk';
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				AddCoinData = {'userpass':tmpIguanaRPCAuth,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"services":129,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"ZET","name":"Zetacoin","netmagic":"fab503df","p2p":17333,"rpc":17335,"pubval":80,"p2shval":9,"wifval":224,"txfee_satoshis":"10000","minconfirms":2,"genesishash":"000006cab7aa2be2da91015902aa4458dd5fbb8778d175c36d429dc986f2bff4","genesis":{"version":1,"timestamp":1375548986,"nBits":"1e0fffff","nonce":2089928209,"merkle_root":"d0227b8c3e3d07bce9656b3d9e474f050d23458aaead93357dcfdac9ab9b79f9"},"alertpubkey":"045337216002ca6a71d63edf062895417610a723d453e722bf4728996c58661cdac3d4dec5cecd449b9086e9602b35cc726a9e0163e1a4d40f521fbdaebb674658"}
	}
	if ( addcoin_data.coin == 'KMD' ) {
		logincoinfullname = 'Komodo';

		if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; }
		if ( addcoin_data.mode == '0' ) { logincoinmodeinfo = 'Basilisk'; }
		if ( addcoin_data.mode == '-1' ) {
			logincoinmodeinfo = 'Native';
			var confpath = Shepherd_getConf('komodod');
			console.log(confpath[0].path);
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

		if ( addcoin_data.mode == '-1' ) {
			var setconfig = function() {
				return new Promise(function(resolve, reject) {
					Shepherd_setConf('komodod');
					var result = 'setconfig: DONE';
					console.log(result);
					resolve(result);
				});
			}

			var startcoin = function() {
				return new Promise(function(resolve, reject) {
					Shepherd_herd('komodod', {
						'ac_name': 'komodod',
						'ac_options': [
              '-daemon=0',
							'-addnode=78.47.196.146'
						]
					});
					var result = 'startcoin: DONE';
					console.log(result);
					resolve(result);
				});
			}

			setconfig()
			.then(function(result) {
				return startcoin();
			});

			var tmpinternval = 6000,
					AddCoinData = {'userpass':tmpIguanaRPCAuth,"conf":"komodo.conf","path":confpath[0].path,"unitval":"20","zcash":1,"RELAY":-1,"VALIDATE":0,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","startpend":8,"endpend":8,"services":0,"maxpeers":32,"newcoin":"KMD","name":"Komodo","hasheaders":1,"useaddmultisig":0,"netmagic":"f9eee48d","p2p":7770,"rpc":7771,"pubval":60,"p2shval":85,"wifval":188,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71","protover":170002,"genesisblock":"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2","debug":0}
		} else {
			var AddCoinData = {'userpass':tmpIguanaRPCAuth,"unitval":"20","zcash":1,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","startpend":32,"endpend":32,"services":129,"maxpeers":32,"newcoin":"KMD","name":"Komodo","hasheaders":1,"useaddmultisig":0,"netmagic":"f9eee48d","p2p":7770,"rpc":7771,"pubval":60,"p2shval":85,"wifval":188,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71","protover":170002,"genesisblock":"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2","debug":0}
		}
	}
	if ( addcoin_data.coin == 'BTM' ) {
		logincoinfullname = 'Bitmark';

		if ( addcoin_data.mode == '1' ) {
			logincoinmodeinfo = 'Full';
		} else {
			logincoinmodeinfo = 'Basilisk';
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				AddCoinData = {'userpass':tmpIguanaRPCAuth,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"BTM","name":"Bitmark","netmagic":"f9beb4d9","p2p":9265,"rpc":9266,"pubval":85,"p2shval":5,"wifval":213,"txfee_satoshis":"0","minconfirms":2,"genesishash":"c1fb746e87e89ae75bdec2ef0639a1f6786744639ce3d0ece1dcf979b79137cb","genesis":{"hashalgo":"scrypt","version":1,"timestamp":1405274442,"nBits":"1d00ffff","nonce":14385103,"merkle_root":"d4715adf41222fae3d4bf41af30c675bc27228233d0f3cfd4ae0ae1d3e760ba8"},"alertpubkey":"04bf5a75ff0f823840ef512b08add20bb4275ff6e097f2830ad28645e28cb5ea4dc2cfd0972b94019ad46f331b45ef4ba679f2e6c87fd19c864365fadb4f8d2269"}
	}
	if ( addcoin_data.coin == 'CARB' ) {
		logincoinfullname = 'Carboncoin';

		if ( addcoin_data.mode == '1' ) {
			logincoinmodeinfo = 'Full';
		} else {
			logincoinmodeinfo = 'Basilisk';
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				AddCoinData = {'userpass':tmpIguanaRPCAuth,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"CARB","name":"Carboncoin","netmagic":"abccbbdf","p2p":9350,"rpc":9351,"pubval":47,"p2shval":5,"wifval":175,"txfee_satoshis":"0","minconfirms":2,"genesishash":"a94f1aae8c409a0bd1e53cbca92d7e506b61c51d955cf56f76da501718d48d6c","genesis":{"hashalgo":"scrypt","version":1,"timestamp":1389199888,"nBits":"1e0ffff0","nonce":605268,"merkle_root":"074bbb9d355731bfa8f67130e2179db7518d1387ad52e55309d4debe7d4e6383"},"alertpubkey":"046d6918a7c0c053aa942dbb8861499be4bd915c8bfb6a2b77b3787e207097cc2734b9321226ff107c1a95dae98570a66baec66e350d78ceba091b54411654d33f"}
	}
	if ( addcoin_data.coin == 'ANC' ) {
		logincoinfullname = 'AnonCoin';

		if ( addcoin_data.mode == '1' ) {
			logincoinmodeinfo = 'Full';
		} else {
			logincoinmodeinfo = 'Basilisk';
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth'),
				AddCoinData = {'userpass':tmpIguanaRPCAuth,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"ANC","name":"AnonCoin","netmagic":"facabada","p2p":9377,"rpc":28332,"pubval":23,"p2shval":5,"wifval":151,"txfee_satoshis":"2000000","minconfirms":2,"genesishash":"00000be19c5a519257aa921349037d55548af7cabf112741eb905a26bb73e468","genesis":{"version":1,"timestamp":1370190760,"nBits":"1e0ffff0","nonce":347089008,"merkle_root":"7ce7004d764515f9b43cb9f07547c8e2e00d94c9348b3da33c8681d350f2c736"},"alertpubkey":"04c6db35c11724e526f6725cc5bd5293b4bc9382397856e1bcef7111fb44ce357fd12442b34c496d937a348c1dca1e36ae0c0e128905eb3d301433887e8f0b4536"}
	}
	if ( addcoin_data.coin == 'FRK' ) {
		logincoinfullname = 'Franko';

		if ( addcoin_data.mode == '1' ) {
			logincoinmodeinfo = 'Full';
		} else {
			logincoinmodeinfo = 'Basilisk';
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');
				AddCoinData = {'userpass':tmpIguanaRPCAuth,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"prefetchlag":-1,"poll":10,"active":1,"agent":"iguana","method":"addcoin","maxpeers":256,"newcoin":"FRK","name":"Franko","netmagic":"7defaced","p2p":7912,"rpc":7913,"pubval":35,"p2shval":5,"wifval":163,"txfee_satoshis":"0","minconfirms":2,"genesishash":"19225ae90d538561217b5949e98ca4964ac91af39090d1a4407c892293e4f44f","genesis":{"hashalgo":"scrypt","version":1,"timestamp":1368144664,"nBits":"1e0ffff0","nonce":731837,"merkle_root":"b78f79f1d10029cc45ed3d5a1db7bd423d4ee170c03baf110a62565d16a21dca"},"alertpubkey":"04d4da7a5dae4db797d9b0644d57a5cd50e05a70f36091cd62e2fc41c98ded06340be5a43a35e185690cd9cde5d72da8f6d065b499b06f51dcfba14aad859f443a"}
	}
	if ( addcoin_data.coin == 'SUPERNET' ) {
		logincoinfullname = 'SUPERNET';

		if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; }
		if ( addcoin_data.mode == '0' ) { logincoinmodeinfo = 'Basilisk'; }
		if ( addcoin_data.mode == '-1' ) {
			logincoinmodeinfo = 'Native';
			var confpath = Shepherd_getConf('SUPERNET');
			console.log(confpath[0].path);
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

		if ( addcoin_data.mode == '-1' ) {
			var setconfig = function() {
				return new Promise(function(resolve, reject) {
					Shepherd_setConf('SUPERNET');
					var result = 'setconfig: DONE';
					console.log(result);
					resolve(result);
				});
			}

			var startcoin = function() {
				return new Promise(function(resolve, reject) {
					Shepherd_herd('komodod', {
						'ac_name': 'SUPERNET',
						'ac_options': [
							'-daemon=0',
              				'-server',
							'-ac_name=SUPERNET',
							'-ac_supply=816061',
							'-addnode=78.47.196.146'
						]
					});

					var result = 'startcoin: DONE';
					console.log(result);
					resolve(result);
				});
			}

			setconfig()
			.then(function(result) {
				return startcoin();
			});

			var tmpinternval = 6000,
					AddCoinData = {'userpass':tmpIguanaRPCAuth,"conf":"SUPERNET.conf","path":confpath[0].path,"unitval":"20","zcash":1,"RELAY":-1,"VALIDATE":0,"prefetchlag":-1,"poll":100,"active":1,"agent":"iguana","method":"addcoin","startpend":4,"endpend":4,"services":129,"maxpeers":32,"newcoin":"SUPERNET","name":"SUPERNET","hasheaders":1,"useaddmultisig":0,"netmagic":"cc55d9d4","p2p":11340,"rpc":11341,"pubval":60,"p2shval":85,"wifval":188,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71","protover":170002,"genesisblock":"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2","debug":0,"seedipaddr":"78.47.196.146"}
		} else {
			var AddCoinData = {'userpass':tmpIguanaRPCAuth,"unitval":"20","zcash":1,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"prefetchlag":-1,"poll":100,"active":1,"agent":"iguana","method":"addcoin","startpend":4,"endpend":4,"services":129,"maxpeers":32,"newcoin":"SUPERNET","name":"SUPERNET","hasheaders":1,"useaddmultisig":0,"netmagic":"cc55d9d4","p2p":11340,"rpc":11341,"pubval":60,"p2shval":85,"wifval":188,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71","protover":170002,"genesisblock":"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2","debug":0,"seedipaddr":"78.47.196.146"}
		}
	}
	if ( addcoin_data.coin == 'REVS' ) {
		logincoinfullname = 'REVS';

		if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; }
		if ( addcoin_data.mode == '0' ) { logincoinmodeinfo = 'Basilisk'; }
		if ( addcoin_data.mode == '-1' ) {
			logincoinmodeinfo = 'Native';
			var confpath = Shepherd_getConf('REVS');
			console.log(confpath[0].path);
		}

		var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

		if ( addcoin_data.mode == '-1' ) {
			var setconfig = function() {
				return new Promise(function(resolve, reject) {
					Shepherd_setConf('REVS');
					var result = 'setconfig: DONE';
					console.log(result);
					resolve(result);
				});
			}

			var startcoin = function() {
				return new Promise(function(resolve, reject) {
					Shepherd_herd('komodod', {
						'ac_name': 'REVS',
						'ac_options': [
							'-daemon=0',
              				'-server',
							'-ac_name=REVS',
							'-ac_supply=1300000',
							'-addnode=78.47.196.146'
						]
					});

					var result = 'startcoin: DONE';
					console.log(result);
					resolve(result);
				});
			}

			setconfig()
			.then(function(result) {
				return startcoin();
			});

			var tmpinternval = 6000,
					AddCoinData = {"conf":"REVS.conf","path":confpath[0].path,"unitval":"20","zcash":1,"RELAY":-1,"VALIDATE":0,"prefetchlag":-1,"poll":100,"active":1,"agent":"iguana","method":"addcoin","startpend":4,"endpend":4,"services":129,"maxpeers":8,"newcoin":"REVS","name":"REVS","hasheaders":1,"useaddmultisig":0,"netmagic":"905c3498","p2p":10195,"rpc":10196,"pubval":60,"p2shval":85,"wifval":188,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71","protover":170002,"genesisblock":"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2","debug":0,"seedipaddr":"78.47.196.146"}
		} else {
			var AddCoinData = {'userpass':tmpIguanaRPCAuth,"unitval":"20","zcash":1,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"prefetchlag":-1,"poll":100,"active":1,"agent":"iguana","method":"addcoin","startpend":4,"endpend":4,"services":129,"maxpeers":8,"newcoin":"REVS","name":"REVS","hasheaders":1,"useaddmultisig":0,"netmagic":"905c3498","p2p":10195,"rpc":10196,"pubval":60,"p2shval":85,"wifval":188,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71","protover":170002,"genesisblock":"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2","debug":0,"seedipaddr":"78.47.196.146"}
		}
	}
  if ( addcoin_data.coin == 'WIRELESS' ) {
    logincoinfullname = 'WIRELESS';

    if ( addcoin_data.mode == '1' ) { logincoinmodeinfo = 'Full'; }
    if ( addcoin_data.mode == '0' ) { logincoinmodeinfo = 'Basilisk'; }
    if ( addcoin_data.mode == '-1' ) {
      logincoinmodeinfo = 'Native';
      var confpath = Shepherd_getConf('WIRELESS');
      console.log(confpath[0].path);
    }

    var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

    if ( addcoin_data.mode == '-1' ) {
      var setconfig = function() {
        return new Promise(function(resolve, reject) {
          Shepherd_setConf('WIRELESS');
          var result = 'setconfig: DONE';
          console.log(result);
          resolve(result);
        });
      }

      var startcoin = function() {
        return new Promise(function(resolve, reject) {
          Shepherd_herd('komodod', {
            'ac_name': 'WIRELESS',
            'ac_options': [
              '-daemon=0',
              '-server',
              '-ac_name=WIRELESS',
              '-ac_supply=21000000',
              '-addnode=78.47.196.146'
            ]
          });

          var result = 'startcoin: DONE';
          console.log(result);
          resolve(result);
        });
      }

      setconfig()
      .then(function(result) {
        return startcoin();
      });

      var tmpinternval = 6000,
          AddCoinData = {"conf":"WIRELESS.conf","path":confpath[0].path,"unitval":"20","zcash":1,"RELAY":-1,"VALIDATE":0,"prefetchlag":-1,"poll":100,"active":1,"agent":"iguana","method":"addcoin","startpend":4,"endpend":4,"services":129,"maxpeers":8,"newcoin":"WIRELESS","name":"WIRELESS","hasheaders":1,"useaddmultisig":0,"netmagic":"62071ed3","p2p":11666,"rpc":11667,"pubval":60,"p2shval":85,"wifval":188,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71","protover":170002,"genesisblock":"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2","debug":0,"seedipaddr":"78.47.196.146"}
    } else {
      var AddCoinData = {'userpass':tmpIguanaRPCAuth,"unitval":"20","zcash":1,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"prefetchlag":-1,"poll":100,"active":1,"agent":"iguana","method":"addcoin","startpend":4,"endpend":4,"services":129,"maxpeers":8,"newcoin":"WIRELESS","name":"WIRELESS","hasheaders":1,"useaddmultisig":0,"netmagic":"62071ed3","p2p":11666,"rpc":11667,"pubval":60,"p2shval":85,"wifval":188,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71","protover":170002,"genesisblock":"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2","debug":0,"seedipaddr":"78.47.196.146"}
    }
  }
  if ( addcoin_data.coin == 'USD' ) {
    logincoinfullname = 'USD';
    var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

    if ( addcoin_data.mode == '1' ) {
      logincoinmodeinfo = 'Full';
      var AddCoinData = {
            'userpass': tmpIguanaRPCAuth,
            'agent': 'iguana',
            'method': 'paxfiats',
            'mask': 1
      		};
    }
    if ( addcoin_data.mode == '0' ) {
      logincoinmodeinfo = 'Basilisk';
      var AddCoinData = {
            'userpass': tmpIguanaRPCAuth,
            'agent': 'basilisk',
            'method': 'paxfiats',
            'mask': 1
      		};
    }
    if ( addcoin_data.mode == '-1' ) {
      logincoinmodeinfo = 'Native';
      var confpath = Shepherd_getConf('USD');
      console.log(confpath[0].path);
    }

    var tmpIguanaRPCAuth = 'tmpIgRPCUser@' + sessionStorage.getItem('IguanaRPCAuth');

    if ( addcoin_data.mode == '-1' ) {
      var setconfig = function() {
        return new Promise(function(resolve, reject) {
          Shepherd_setConf('USD');
          var result = 'setconfig: DONE';
          console.log(result);
          resolve(result);
        });
      }

      var startcoin = function() {
        return new Promise(function(resolve, reject) {
          Shepherd_herd('komodod', {
            'ac_name': 'USD',
            'ac_options': [
              '-daemon=0',
              '-server',
              '-ac_name=USD',
              '-addnode=78.47.196.146'
            ]
          });

          var result = 'startcoin: DONE';
          console.log(result);
          resolve(result);
        });
      }

      setconfig()
      .then(function(result) {
        return startcoin();
      });

      var tmpinternval = 6000,
          AddCoinData = {"conf":"USD.conf","path":confpath[0].path,"unitval":"20","zcash":1,"RELAY":-1,"VALIDATE":1,"prefetchlag":-1,"poll":100,"active":1,"agent":"iguana","method":"addcoin","startpend":4,"endpend":4,"services":129,"maxpeers":8,"newcoin":"USD","name":"USD","hasheaders":1,"useaddmultisig":0,"netmagic":"2d8e7803","p2p":13966,"rpc":13967,"pubval":60,"p2shval":85,"wifval":188,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71","protover":170002,"genesisblock":"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2","debug":0,"seedipaddr":"78.47.196.146"}
    } else {
      var AddCoinData = {'userpass':tmpIguanaRPCAuth,"unitval":"20","zcash":1,"RELAY":addcoin_data.mode,"VALIDATE":addcoin_data.mode,"prefetchlag":-1,"poll":100,"active":1,"agent":"iguana","method":"addcoin","startpend":4,"endpend":4,"services":129,"maxpeers":8,"newcoin":"USD","name":"USD","hasheaders":1,"useaddmultisig":0,"netmagic":"2d8e7803","p2p":13966,"rpc":13967,"pubval":60,"p2shval":85,"wifval":188,"txfee_satoshis":"10000","isPoS":0,"minoutput":10000,"minconfirms":2,"genesishash":"027e3758c3a65b12aa1046462b486d0a63bfa1beae327897f56c5cfb7daaae71","protover":170002,"genesisblock":"0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000000000000000000000000000000000000000000000000000000000000029ab5f490f0f0f200b00000000000000000000000000000000000000000000000000000000000000fd4005000d5ba7cda5d473947263bf194285317179d2b0d307119c2e7cc4bd8ac456f0774bd52b0cd9249be9d40718b6397a4c7bbd8f2b3272fed2823cd2af4bd1632200ba4bf796727d6347b225f670f292343274cc35099466f5fb5f0cd1c105121b28213d15db2ed7bdba490b4cedc69742a57b7c25af24485e523aadbb77a0144fc76f79ef73bd8530d42b9f3b9bed1c135ad1fe152923fafe98f95f76f1615e64c4abb1137f4c31b218ba2782bc15534788dda2cc08a0ee2987c8b27ff41bd4e31cd5fb5643dfe862c9a02ca9f90c8c51a6671d681d04ad47e4b53b1518d4befafefe8cadfb912f3d03051b1efbf1dfe37b56e93a741d8dfd80d576ca250bee55fab1311fc7b3255977558cdda6f7d6f875306e43a14413facdaed2f46093e0ef1e8f8a963e1632dcbeebd8e49fd16b57d49b08f9762de89157c65233f60c8e38a1f503a48c555f8ec45dedecd574a37601323c27be597b956343107f8bd80f3a925afaf30811df83c402116bb9c1e5231c70fff899a7c82f73c902ba54da53cc459b7bf1113db65cc8f6914d3618560ea69abd13658fa7b6af92d374d6eca9529f8bd565166e4fcbf2a8dfb3c9b69539d4d2ee2e9321b85b331925df195915f2757637c2805e1d4131e1ad9ef9bc1bb1c732d8dba4738716d351ab30c996c8657bab39567ee3b29c6d054b711495c0d52e1cd5d8e55b4f0f0325b97369280755b46a02afd54be4ddd9f77c22272b8bbb17ff5118fedbae2564524e797bd28b5f74f7079d532ccc059807989f94d267f47e724b3f1ecfe00ec9e6541c961080d8891251b84b4480bc292f6a180bea089fef5bbda56e1e41390d7c0e85ba0ef530f7177413481a226465a36ef6afe1e2bca69d2078712b3912bba1a99b1fbff0d355d6ffe726d2bb6fbc103c4ac5756e5bee6e47e17424ebcbf1b63d8cb90ce2e40198b4f4198689daea254307e52a25562f4c1455340f0ffeb10f9d8e914775e37d0edca019fb1b9c6ef81255ed86bc51c5391e0591480f66e2d88c5f4fd7277697968656a9b113ab97f874fdd5f2465e5559533e01ba13ef4a8f7a21d02c30c8ded68e8c54603ab9c8084ef6d9eb4e92c75b078539e2ae786ebab6dab73a09e0aa9ac575bcefb29e930ae656e58bcb513f7e3c17e079dce4f05b5dbc18c2a872b22509740ebe6a3903e00ad1abc55076441862643f93606e3dc35e8d9f2caef3ee6be14d513b2e062b21d0061de3bd56881713a1a5c17f5ace05e1ec09da53f99442df175a49bd154aa96e4949decd52fed79ccf7ccbce32941419c314e374e4a396ac553e17b5340336a1a25c22f9e42a243ba5404450b650acfc826a6e432971ace776e15719515e1634ceb9a4a35061b668c74998d3dfb5827f6238ec015377e6f9c94f38108768cf6e5c8b132e0303fb5a200368f845ad9d46343035a6ff94031df8d8309415bb3f6cd5ede9c135fdabcc030599858d803c0f85be7661c88984d88faa3d26fb0e9aac0056a53f1b5d0baed713c853c4a2726869a0a124a8a5bbc0fc0ef80c8ae4cb53636aa02503b86a1eb9836fcc259823e2692d921d88e1ffc1e6cb2bde43939ceb3f32a611686f539f8f7c9f0bf00381f743607d40960f06d347d1cd8ac8a51969c25e37150efdf7aa4c2037a2fd0516fb444525ab157a0ed0a7412b2fa69b217fe397263153782c0f64351fbdf2678fa0dc8569912dcd8e3ccad38f34f23bbbce14c6a26ac24911b308b82c7e43062d180baeac4ba7153858365c72c63dcf5f6a5b08070b730adb017aeae925b7d0439979e2679f45ed2f25a7edcfd2fb77a8794630285ccb0a071f5cce410b46dbf9750b0354aae8b65574501cc69efb5b6a43444074fee116641bb29da56c2b4a7f456991fc92b2","debug":0,"seedipaddr":"78.47.196.146"}
    }
  }
	setTimeout(function() {
		$.ajax({
			type: 'POST',
			data: JSON.stringify(AddCoinData),
			url: 'http://127.0.0.1:' + config.iguanaPort,
			success: function(data, textStatus, jqXHR) {
				var addcoinData = JSON.parse(data);

				if (addcoinData.result === 'coin added') {
					Iguana_Setactivehandle();
					console.log('coin added');
					toastr.success(logincoinfullname + ' ' + _lang[defaultLang].TOASTR.COIN_STARTED + ' ' + logincoinmodeinfo + ' ' + _lang[defaultLang].TOASTR.MODE, _lang[defaultLang].TOASTR.COIN_NOTIFICATION);

					if (addcoin_data.logincmd == undefined) {
						console.log('command NOT executed from login. RELOADING WALLET WIDGETS...');
						refreshEDEXCoinWalletList();
						//Iguana_DEXImportAll();
						Shepherd_FetchBasiliskData().then(function(result) {
							console.log(result);
						});
						//EDEXMainAddr(addcoin_data.coin).then(function(result){
								//console.log(result)
								//Iguana_DEXImportAddr(addcoin_data.coin,result);
						//})
						//Iguana_DEXImportAllWalletAddr(addcoin_data.coin)
						//$(document).ready(function() { window.location.reload(); });
					} else {
						Iguana_CheckActiveCoins().then(function(result) {
							if (result.length !== 0 ) {
								$('#section-login-addcoin-btn').hide();
								$('#section-login').show();
							}
						});
					}

					$('#addcoin_mdl_full_mode').prop('checked', false);
					$('#addcoin_mdl_basilisk_mode').prop('checked', false);
					$('#addcoin_mdl_native_mode').prop('checked', false);
					$('#addcoin_select_coin_mdl_options').val(_lang[defaultLang].DASHBOARD.SELECT);
				} else if (addcoinData.result === 'coin already there') {
					console.log('coin already there');
					toastr.info(_lang[defaultLang].TOASTR.LOOKS_LIKE + ' ' + logincoinfullname + ' ' + _lang[defaultLang].TOASTR.ALREADY_RUNNING + '.', _lang[defaultLang].TOASTR.COIN_NOTIFICATION);
				} else if (addcoinData.result === null) {
					console.log('coin already there');
					toastr.info(_lang[defaultLang].TOASTR.LOOKS_LIKE + ' ' + logincoinfullname + ' ' + _lang[defaultLang].TOASTR.ALREADY_RUNNING + '.', _lang[defaultLang].TOASTR.COIN_NOTIFICATION);
				}
			},
			error: function(xhr, textStatus, error) {
				console.log(xhr.statusText);
				if ( xhr.readyState == 0 ) {
					Iguana_ServiceUnavailable();
				}
				console.log(textStatus);
				console.log(error);
			}
		});
	}, tmpinternval);
}

function ExecuteAddCoinFn() {
	var addcoin_selected_mode_val = $('input[name="addcoin_select_mode_mdl"]:checked').val(),
			addcoin_selected_coinname_code_val = $('option:selected', '#addcoin_select_coin_mdl_options').val(),
			ExecAddCoinData = {
				'coin': addcoin_selected_coinname_code_val,
				'mode': addcoin_selected_mode_val
			};

	Iguana_addcoin(ExecAddCoinData);
}

function ExecuteAddCoinLoginFn() {
	var addcoin_selected_mode_val = $('input[name="addcoin_select_mode_mdl-login"]:checked').val(),
			addcoin_selected_coinname_code_val = $('option:selected', '#addcoin_select_coin_mdl_options-login').val(),
			ExecAddCoinData = {
				'coin': addcoin_selected_coinname_code_val,
				'mode': addcoin_selected_mode_val,
				'logincmd': 1
			};

	Iguana_addcoin(ExecAddCoinData);
}