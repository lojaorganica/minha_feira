
import type { GalleryItem, GalleryFair, GalleryTheme } from './types';

// Lote 2: Contém as URLs da galeria a partir do item 251.
const allItemUrls: string[] = [
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_102_beterraba_de_ferro.mp4?alt=media&token=ad453906-baaa-47c3-9ea4-c38324383ad5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_62_batatman.mp4?alt=media&token=763b8176-92ec-4c32-8139-d3c66d227e3c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_64_banantrix.mp4?alt=media&token=a55b04c4-928e-4afc-be14-ad2b0fb104a1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_65_mandiorpheus.mp4?alt=media&token=05b3e20a-7040-425b-af72-1079e680d6dc',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_68_robinete.mp4?alt=media&token=4f4b7fc5-422a-4f5c-a16a-b02c54ac4b8c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_71_aqualface.mp4?alt=media&token=ba042fd5-4607-4390-9f30-51e43dd15976',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_75_sporock.mp4?alt=media&token=6f899a1f-5a6e-485b-b05c-9bfe3ae8ea40',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_76_inhame_aranha.mp4?alt=media&token=265991b4-78c0-432f-8b6b-ce8e51a17151',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_79_uva_negra.mp4?alt=media&token=c7a801e4-5bbf-400f-95ac-df6bf9cd6b6d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_81_limao_america.mp4?alt=media&token=b95ecd70-ce76-4784-b69e-2abae347d7a4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_90_brulk.mp4?alt=media&token=bcd78c9e-6e3c-4569-925a-5fa135f903b9',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_91_pepino_verde.mp4?alt=media&token=f5276a1d-ce00-4ee9-a202-b15f600fc598',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_92_abobrinha_maravilha.mp4?alt=media&token=593dfe46-61df-4ff9-8e78-569414f7ac33',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_95_coisa_de_milho.mp4?alt=media&token=20f6db62-6595-43db-bb49-f5a33d60927e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feiras_flamengo_laranjeiras_96_berinjela_negra.mp4?alt=media&token=764fb0fc-7a34-4403-905a-b6aa9e6606a6',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_103_bete.png?alt=media&token=3c112f6f-4ad9-4a54-8564-9d0ed6e9582d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_23_joaninha.png?alt=media&token=a069c205-4637-4b90-8e63-c085fc868f1b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_61_batatman.png?alt=media&token=6ea75b42-6d6c-454c-b13f-8d0cb5928e40',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_63_mandio.png?alt=media&token=099d9f7d-9464-4984-a582-0cfc61fb4f1e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_65_inhame.png?alt=media&token=325038c4-6b3d-4596-895c-8313f18d284a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_66_uverine.png?alt=media&token=e6fb071b-b225-4283-8ae2-78434e00d8fc',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_67_robinete.png?alt=media&token=d5136c13-3189-4129-9579-acb47f39f46e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_70_aqua.png?alt=media&token=4a9952c9-1db4-4707-9e5b-c17b588bf68e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_77_sporock.png?alt=media&token=07d8f7a7-b4d8-4fbb-a66c-2946e6c5af79',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_80_uva_negra.png?alt=media&token=bb990aa6-f533-4275-a241-0b8344cac861',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_82_limao.png?alt=media&token=1a7c917d-c619-4b4d-aceb-403ad22e8d58',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_93_abobrinha.png?alt=media&token=6d3b6395-a7ad-4538-98a7-732494b7b0b4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_93_pepino.png?alt=media&token=0dc5c5d8-ed9c-471d-8067-4ffe4b7ee6e7',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_94a_coisa.png?alt=media&token=b690ab5e-a050-420c-8ff5-3881b8b1fed9',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_94b_coisa.png?alt=media&token=de667db8-a4c9-43ed-b645-44a100243639',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_97_berin.png?alt=media&token=29eb0d33-0244-426e-8cf4-6199f9146f35',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feiras_flamengo_laranjeiras_99_brulk.png?alt=media&token=593a813f-b898-4f13-ba07-8286acd7acf1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_103_bete.png?alt=media&token=b6c3e862-4a7a-4bf6-b78a-bc8579495b86',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_36_bata.png?alt=media&token=20e18dcb-b7f0-410a-922b-a98a9ab2d985',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_38_robin.png?alt=media&token=526e91d5-bf81-46e6-9d66-e9efa84d4807',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_44_sporock.png?alt=media&token=43001901-4292-4d29-bd47-edb5897cca89',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_45_inhame.png?alt=media&token=fdd03fd9-4461-4561-9a67-304ab8aeee55',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_48_uva.png?alt=media&token=a65368aa-dec7-471a-a6e7-e06fd1582154',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_49_limao.png?alt=media&token=d293f76c-464c-4d1b-8015-303f146aaaf6',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_52_uverine.png?alt=media&token=658030d2-6d5f-4032-9d14-844f75a6500a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_53_beri.png?alt=media&token=b733bbed-dcd6-4f2a-ad0d-b786684f6f97',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_57_brulk.png?alt=media&token=5f80cf2e-6492-45a1-9e8d-0f92dde7ab73',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_63_abobrinha_maravilha.png?alt=media&token=db9327cd-a40d-44ad-ba44-aaaf85730fa4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_64_coisa.jpeg?alt=media&token=8a0dfdbb-c4d9-4028-bd7e-7c1fdc657543',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_70_aqua.png?alt=media&token=47c7ac36-9d58-42fa-ba71-1f8057e6e7f4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_76_mandi.png?alt=media&token=3b4385d4-6c8a-42cb-a48b-10919dcfe8f2',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_feiras_flamengo_laranjeiras_79_pepino.png?alt=media&token=fc091f89-17c3-4e76-8457-473eef8f8bc3',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_100_feiras_flamengo_laranjeiras.png?alt=media&token=91ea86db-096f-4a19-b23b-21554960e9b0',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_101_feiras_flamengo_laranjeiras.png?alt=media&token=a91e2c0f-3af0-4532-941d-f1d7d4b94d7c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_104_feiras_flamengo_laranjeiras.png?alt=media&token=9645ed01-1b76-4e27-85c5-dcd5f518745f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_105_feiras_flamengo_laranjeiras.png?alt=media&token=28ba7cae-3e5a-4c30-8453-8998ef421160',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_106_feiras_flamengo_laranjeiras.png?alt=media&token=ea662e40-ce90-4943-87a3-b22042138950',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_24_feiras_flamengo_laranjeiras.png?alt=media&token=0ac5b001-8917-45c3-948e-3e2df672a4c8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_28_feiras_flamengo_laranjeiras.png?alt=media&token=43e62ab2-c4ce-4932-9d9a-e260d5265421',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_29_feiras_flamengo_laranjeiras.png?alt=media&token=0d51bbb2-3781-4828-a305-83b990b948f4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_30_feiras_flamengo_laranjeiras.png?alt=media&token=fd137203-7560-41f7-ae15-214a993bbe75',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_83_feiras_flamengo_laranjeiras.png?alt=media&token=a35b8b74-f1b0-4720-a812-14e2c6ac2a42',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_84_feira_tijuca.png?alt=media&token=b917b926-b18e-47a0-8a7e-5b7f5f330ca9',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_84_feiras_flamengo_laranjeiras.png?alt=media&token=f052a68b-1edc-425e-9abd-8db6472e4883',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_85_feiras_flamengo_laranjeiras.png?alt=media&token=2db403c1-c96b-4bb2-90e6-7611eafe6484',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_87_feiras_flamengo_laranjeiras.png?alt=media&token=a14a4194-9342-4ece-9282-b0fccf353bee',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_88_feiras_flamengo_laranjeiras.png?alt=media&token=d21bc3be-d6a4-4066-a0f1-f84fe015bf4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_93_feiras_flamengo_laranjeiras.png?alt=media&token=7e9bd07a-f9e2-4558-8d36-e5e8d8b295d1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_98_feiras_flamengo_laranjeiras.png?alt=media&token=95ca9421-86a0-4627-a63b-f114388f13af',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_99_feiras_flamengo_laranjeiras.png?alt=media&token=3c8d1c6a-6774-4994-90be-3df101244507',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_04_feiras_flamengo_laranjeiras.png?alt=media&token=ba9cca46-b2e6-4bc1-bc78-0450851fe69c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_07_feiras_flamengo_laranjeiras.png?alt=media&token=9fd03b83-8db6-459f-815c-727cde5bb5db',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_06_feiras_flamengo_laranjeiras.png?alt=media&token=13944fa6-03c1-424c-b727-f843485f6f22',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_101_feiras_flamengo_laranjeiras.png?alt=media&token=ba12cd57-2f7f-474b-beb4-3efed5c9de0b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_105_feiras_flamengo_laranjeiras.png?alt=media&token=2c6bb5e8-3702-40f0-88d6-dcfc30c80ac8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_107_feiras_flamengo_laranjeiras.png?alt=media&token=e6d6067a-0643-481e-98bc-35be29e2d154',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_109_feiras_flamengo_laranjeiras.png?alt=media&token=92168ec7-2a24-46a4-9e45-218b750b4cfe',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_10_feiras_flamengo_laranjeiras.png?alt=media&token=9d4c61d5-b6fd-4be9-acc5-38c3376ee42a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_51_feiras_flamengo_laranjeiras.png?alt=media&token=b828b911-6e83-469d-8ec7-ee97da5773ef',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_55_feiras_flamengo_laranjeiras.png?alt=media&token=41336d51-1cfa-43d1-b809-4a65e921ce83',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_56_feiras_flamengo_laranjeiras.png?alt=media&token=563926dd-3bdf-458e-b93e-a7ed58ce9d97',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_81_feiras_flamengo_laranjeiras.png?alt=media&token=6e5361e3-2bb1-4a98-a071-70ff578e979b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_86_feiras_flamengo_laranjeiras.png?alt=media&token=02ea7dc9-1ae6-4740-9b31-5940b7e1beec',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_88_feiras_flamengo_laranjeiras.png?alt=media&token=ae312598-6b6b-414d-84d9-c3407ecbe77b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_91_feiras_flamengo_laranjeiras.png?alt=media&token=d7068ec0-b70f-4ae3-8204-5fdf7eba2399',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_92_feiras_flamengo_laranjeiras.png?alt=media&token=48b88133-d10d-43ee-b9f4-5c3cf11dd342',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_95_feiras_flamengo_laranjeiras.png?alt=media&token=3a1ed573-4186-4df2-a6fa-592c44faa2f1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_97_feiras_flamengo_laranjeiras.png?alt=media&token=8be16d63-017f-49ce-8def-55435f3e9c10',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_98_feiras_flamengo_laranjeiras.png?alt=media&token=27500fce-19c1-4280-9b52-a9a59979feb6',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_chuva_19_feiras_flamengo_laranjeiras.png?alt=media&token=f4d8b975-1240-4a73-bd25-9aabdb6099e2',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_chuva_23_feiras_flamengo_laranjeiras.png?alt=media&token=7f5df071-2da1-438f-a425-bbfe8464d0b1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_035_beterraba_feiras_flamengo_laranjeiras.png?alt=media&token=a8c4c8eb-4d1c-41c0-a8ff-a7e20fc42ea4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_033_beterraba_feiras_flamengo_laranjeiras.png?alt=media&token=aa3d03c3-6625-4e86-9582-d5d1a9a9af80',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_046_feiras_flamengo_laranjeiras.png?alt=media&token=0838d3d8-3791-4b6c-b4b8-97216fa47f9a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_022_feiras_flamengo_laranjeiras.png?alt=media&token=ada022f6-1600-4b46-b018-a84da1cd9348',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_101_beterraba_de_ferro.mp4?alt=media&token=fd86f923-d46b-40c2-a2b5-be3ac650a31a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_50_batatman.mp4?alt=media&token=29f805de-9691-42f0-9635-79e1b309d466',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_53_sporock.mp4?alt=media&token=2e5e5013-ddcd-42e6-aef1-c5d0e2f73cea',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_54_inhame_aranha.mp4?alt=media&token=495dbf1c-277f-40f2-bfa6-97e02627341b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_59_aqualface.mp4?alt=media&token=fa2284f5-8ba1-4f03-9df9-7dc9ac82f1a8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_62_robinete.mp4?alt=media&token=b00f09f7-b8c2-4703-b4fb-e63b27eb040b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_66_coisa_de_milho.mp4?alt=media&token=448a1fc2-2d81-485d-beac-5379948b0c69',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_68_uva_negra.mp4?alt=media&token=166c086c-0904-4e7e-96e7-ad229d4fd979',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_71_limao_america.mp4?alt=media&token=527890ce-aeca-4ba5-81a7-69863e8ba7bc',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_73_uverine.mp4?alt=media&token=82d92f33-0508-4c72-b21c-0f4a4c6da6c2',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_74_berinjela_negra.mp4?alt=media&token=00ba1d86-64b3-41e4-96f8-2ca4713cb7cd',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_77_brulk.mp4?alt=media&token=305d9878-9585-45da-b2d9-ad87f6516532',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_78_mandiorpheus.mp4?alt=media&token=9b1d80b4-c0d6-40ac-86a0-f8b7108aacdd',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_80_abobrinha_maravilha.mp4?alt=media&token=1b7122a9-8c89-4d59-9c40-950c6254d250',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_todas_feiras_83_pepino_verde.mp4?alt=media&token=86aac784-9b1c-4536-8c86-b5364ccfb0bb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_104_todas_feiras.png?alt=media&token=33d6ff96-1419-4605-89a6-bb5bc623854f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_105_todas_feiras.png?alt=media&token=f81cd7b8-7341-453b-9d25-315ab25f12d2',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_106_todas_feiras.png?alt=media&token=2878e890-ced7-4d06-953e-79bf347d5ee1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_17_todas_feiras.png?alt=media&token=c43cccf1-d6c5-47d9-81b8-41f9da4cf8da',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_24_todas_feiras.png?alt=media&token=c1041860-0b95-4c20-b2b0-92de0997b0e6',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_26_todas_feiras.png?alt=media&token=8378bf23-e5e8-4ff5-b281-b23d3bfb216d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_30_todas_feiras.png?alt=media&token=5a072510-7284-417c-aedd-42a3ca69f515',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_55_todas_feiras.png?alt=media&token=4b6ef0ae-b017-467a-b72f-ea40a277fb43',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_56_todas_feiras.png?alt=media&token=9e875aaa-d576-4a70-acb8-5fcdccd25898',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_57_todas_feiras.png?alt=media&token=f86b0654-4dda-4dd5-88fc-1bc030bb8bc4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_61_todas_feiras.png?alt=media&token=a883548a-dbad-40a2-9cc9-da194b5e2ecb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_67_todas_feiras.png?alt=media&token=3c3a9011-7475-4b4f-a85a-59cb8b95d904',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_87_todas_feiras.png?alt=media&token=1dbc620b-c1ef-493c-88cc-bbc655ef4a82',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_88_todas_feiras.png?alt=media&token=85ca053a-d91d-40a9-8d2f-86254194ed17',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_89_todas_feiras.png?alt=media&token=f5ecb791-8cc5-41db-9f36-ddee2814ac3f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_90_todas_feiras.png?alt=media&token=b46ce33e-9f8f-48e8-9f57-e5373807d9c5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_05_todas_feiras.png?alt=media&token=e32fa679-364f-461f-b10b-b249637c6af7',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_12_todas_feiras.png?alt=media&token=de487e97-0c48-4349-bf43-6a8112900d59',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_07_todas_feiras.png?alt=media&token=0c6bea03-3935-4639-a0e3-9bcbd33cf808',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_08_todas_feiras.png?alt=media&token=56c2eda9-daac-4693-904e-b2cc6996e235',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_100_todas_feiras.png?alt=media&token=db59ef83-a38d-431a-80fc-a1f2060295b4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_106_todas_feiras.png?alt=media&token=49a11a3c-095a-47fa-ab16-d0085a31c810',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_108_todas_feiras.png?alt=media&token=ac2d9ba2-3c3b-4ed4-80b7-a849bdade9b9',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_110_todas_feiras.png?alt=media&token=968d83ff-7a59-4c1f-beaf-15b2e60151da',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_43_todas_feiras.png?alt=media&token=02a1bed4-63a1-4810-9eb2-3013dec3f1c7',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_58_todas_feiras.png?alt=media&token=ea00d11e-45c4-4023-be1e-d5f473b3a36b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_59_todas_feiras.png?alt=media&token=9025e448-562a-47ea-ae55-d9ed24e2a8b1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_69_todas_feiras.png?alt=media&token=cce76e39-615e-42cb-bb98-f5c0633e5ccf',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_87_todas_feiras.png?alt=media&token=8d29edf1-4171-4171-932e-31e8a40210a0',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_89_todas_feiras.png?alt=media&token=284c5a20-5902-4c10-9857-7a157819368e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_90_todas_feiras.png?alt=media&token=99fbb7cc-5d25-4b4e-ae45-89490c18e636',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_93_todas_feiras.png?alt=media&token=4b722d48-acfc-4c88-adc2-eacce4191538',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_94_todas_feiras.png?alt=media&token=ce9cedad-ae22-415e-ac75-6179b4aab562',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_96_todas_feiras.png?alt=media&token=3fa773a3-cd11-4d4f-b9e0-c524b44a005e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_99_todas_feiras.png?alt=media&token=81393c97-beb6-49f6-a8d4-e56fa4e57d53',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_chuva_17_todas_feiras.png?alt=media&token=0fc68154-09ef-41d5-a270-119fcd5d2c27',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_story_chuva_92_todas_feiras.png?alt=media&token=831f13a2-6713-4560-a409-bbd3587710c3',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_102_beterraba_de_ferro.png?alt=media&token=42214b73-7be5-4396-8f92-00adc3574f34',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_28_joaninha.png?alt=media&token=ba64cf3f-d89f-45ad-89f9-a49eb6f5caf4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_51_batatman.png?alt=media&token=2124d0fe-3ce9-48d0-8685-6a3afa681739',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_60_aqualface.png?alt=media&token=2982f1ee-4ee8-45e2-8e8c-2a97a9c70546',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_63_robinete.png?alt=media&token=6755a62d-0d0b-43b0-b418-588ebbfbdf85',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_64_inhame_aranha.png?alt=media&token=3526f683-a529-4c4a-adb0-62450cc3b513',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_65_sporock.png?alt=media&token=327dc776-015f-4593-a61e-c04304e352b6',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_67_coisa_de_milho.png?alt=media&token=8e3ba13e-34e7-407b-9884-9dadb23ce941',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_69_uva_negra.png?alt=media&token=2d5c7146-6399-4e55-b3e0-59f77cbf0fca',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_70_limao_america.png?alt=media&token=a697b88c-812c-4160-88d7-b0a16c420dd4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_72_uverine.png?alt=media&token=4f8f32ae-d465-4af8-9982-a57026fcdbd8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_75_berinjela_negra.png?alt=media&token=757d7d6e-9bdb-4cad-b8ad-373647305b22',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_76_brulk.png?alt=media&token=73c957a3-2746-41b8-b137-6a1b9f8ecab2',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_79_mandiorpheus.png?alt=media&token=e966c465-a399-4542-88c6-490d0079921a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_82_abobrinha_maravilha.png?alt=media&token=bf9fe2e0-2f79-4c92-a62c-316ec2cb23f5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_todas_feiras_84_pepino_verde.png?alt=media&token=71f94515-ad48-44a7-9f05-abba16920f98',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_story_todas_feiras_80_pepino.png?alt=media&token=ba9dd9e5-75a3-453e-872f-62e03f804ab3',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_107_todas_feiras.png?alt=media&token=8e85de64-1938-49c1-8fcf-565e54f1512d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_011_todas_feiras.png?alt=media&token=7ef01ca7-f1bf-41ad-af39-0893982e5f21',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_cartoon_022_feiras_flamengo_laranjeiras.png?alt=media&token=ec1b32ab-312e-4254-9eee-2c49db247a28',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Faali_story_cartoon_111_feiras_flamengo_laranjeiras.png?alt=media&token=9ecdc472-3533-4a7a-adc2-e23653a94743',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_76_abobrinha_maravilha.png?alt=media&token=91fe35d1-61d0-4c47-aab4-be6a0cd06f30',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_92_beterraba_de_ferro.png?alt=media&token=8082d54a-1cde-4893-9b5d-ec123e3f84f3',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_cartoon_feira_tijuca_81_pepino_verde.png?alt=media&token=b33cf144-855e-4731-aaf6-3de935f12bf8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_48_batatman.mp4?alt=media&token=b294d6aa-3bc5-444e-9887-602c546b901b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_49_inhame_aranha.mp4?alt=media&token=806d4f89-478f-447f-a1b9-f56a11c70adb',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_52_robinete.mp4?alt=media&token=d22a3e62-056e-4e0e-ac0a-a1d484f4093a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_54_sporock.mp4?alt=media&token=3d4055cf-76d2-45e4-a62a-a1c553b78ca8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_57_aqualface.mp4?alt=media&token=e41f3c31-8497-401f-8fe2-982ed1077501',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_61_uva_negra.mp4?alt=media&token=c03748c9-20b7-45d2-a481-91da4ad879a1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_63_coisa_de_milho.mp4?alt=media&token=5df59f3d-73b8-4329-b28a-c0aabd7a38b5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_66_limao_america.mp4?alt=media&token=4db398b0-b3d6-4ea1-80de-b64bf18aeac9',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_68_uverine.mp4?alt=media&token=5a60387d-2326-4e17-a5ff-e4bd45602f02',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_69_berinjela_negra.mp4?alt=media&token=bcdf44e0-5bc5-4646-9379-caf271254a04',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_71_brulk.mp4?alt=media&token=ab21e3a9-38d5-4d5a-82d0-d5f51839e53c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_74_mandiorpheus.mp4?alt=media&token=929cebd8-b86a-4bc1-b866-9b995315d36f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_75_abobrinha_maravilha.mp4?alt=media&token=00645545-1ab5-43af-91c9-150f884b1519',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_80_pepino_verde.mp4?alt=media&token=a2e427e8-7c74-4957-8fe7-32898c98057d',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_tijuca_91_beterraba_de_ferro.mp4?alt=media&token=79cfaddf-d0c0-48fb-9480-0787d66ac5d9',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_19_feira_tijuca.png?alt=media&token=4e260f86-df2f-48ce-b2b7-fb4392238c78',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_20_feira_tijuca.png?alt=media&token=03b7cf6a-1a44-4ce7-8124-a226d015e744',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_24_feira_tijuca.png?alt=media&token=832130cc-aa17-4c9c-8831-65ce5afa6f7e',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_26_feira_tijuca.png?alt=media&token=87d284bb-fcb4-45a3-bf78-22df26b61fa2',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_55_feira_tijuca.png?alt=media&token=30c8642d-e2a0-4430-a7a6-c66a0f12616f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_56_feira_tijuca.png?alt=media&token=9f6e3d53-a3cc-4a77-926d-10788562a49b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_60_feira_tijuca.png?alt=media&token=8dd9da8a-fbd5-4da9-838a-566628fbfab9',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_85_feira_tijuca.png?alt=media&token=1ac6fe57-cd40-4eb4-8ef2-976553fb0df8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_86_feira_tijuca.png?alt=media&token=763116d2-7de6-4820-9d99-c766ec4b43aa',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_87_feira_tijuca.png?alt=media&token=61bb8d0a-2fef-4976-bbc2-70feacf5afaa',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_88_feira_tijuca.png?alt=media&token=34f98bc7-9df9-496b-9906-7832631d7bce',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_89_feira_tijuca.png?alt=media&token=8271db31-fe68-44a5-b7a2-fffd5099e8d5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_90_feira_tijuca.png?alt=media&token=6713f0ea-e6ea-4d4e-baa6-2752c96629a1',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_93_feira_tijuca.png?alt=media&token=b81cf871-963a-43cc-8d18-37ffadd120cd',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_94_feira_tijuca.png?alt=media&token=4b6675af-13d8-4bac-b090-d75c0d2e3ad4',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_95_feira_tijuca.png?alt=media&token=dec2b9e4-c43a-465a-8bc9-1e1814e5ae92',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_02_feira_tijuca.png?alt=media&token=13cc260e-0264-4610-8c4d-32b5e45eeee5',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_09_feira_tijuca.png?alt=media&token=1a6c1288-cc77-4467-ab2e-1252bd2c524f',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_17_feira_botafogo.png?alt=media&token=0f21f6fe-99b4-4681-ab29-4a4c00f7424b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_18_feira_botafogo.png?alt=media&token=0a2a9081-5a5b-461c-80f3-34c1301b9135',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_20_feira_botafogo.png?alt=media&token=80b3b03e-47ed-429f-b627-d5b96173d193',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_22_feira_botafogo.png?alt=media&token=77e3ae70-2104-408b-9a81-ec93e1d85fef',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_35_feira_botafogo.png?alt=media&token=2f43b48e-c15a-45bf-84ba-ddeb51b6dc82',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_36_feira_botafogo.png?alt=media&token=2ed40f88-cdb7-4c82-917b-79971cfadeb2',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_44_feira_botafogo.png?alt=media&token=67a8c528-9944-44b1-9d1a-b5c34572c8e0',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_69_feira_botafogo.png?alt=media&token=3571b9b9-73eb-45ce-b4f7-fb19b5e59035',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_70_feira_botafogo.png?alt=media&token=e4d7462d-5785-4e10-be6a-040a43a11d3a',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_71_feira_botafogo.png?alt=media&token=e8618e7b-e9a0-46fc-975f-8959ce2aa670',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_73_feira_botafogo.png?alt=media&token=615fe4fb-6502-451a-b578-df860be6e04c',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_74_feira_botafogo.png?alt=media&token=fd2ae21c-ea12-45be-b9b3-918fb3d2f719',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_75_feira_botafogo.png?alt=media&token=0ab97dff-2cd6-47c9-8a31-0d7604f0718b',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_78_feira_botafogo.png?alt=media&token=2bd0d260-62f6-4e4d-82a7-6398ea5cf8f8',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_79_feira_botafogo.png?alt=media&token=546d2869-64a7-4c75-90d4-849de10209c3',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_80_feira_botafogo.png?alt=media&token=1711da43-cfe5-49df-84be-6d2a7c058a36',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_06_feira_botafogo.png?alt=media&token=0ccb0f94-0abc-404c-9a99-b3d2befd4230',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Ffot_chuva_10_feira_botafogo.png?alt=media&token=53f72ddf-d829-4f77-9833-8660ef973d72',
    'https://firebasestorage.googleapis.com/v0/b/verdant-market-x1qp8.firebasestorage.app/o/media_minha_feira%2Fap_feira_grajau_31_batatman.mp4?alt=media&token=553bcd2c-faee-4863-812f-ce99c0d432cf'
];

function getFairCategories(fileName: string): GalleryFair[] {
    const fairs: GalleryFair[] = [];
    if (fileName.includes('todas_feiras')) {
        fairs.push('Todas');
    }
    if (fileName.includes('feiras_flamengo_laranjeiras')) {
        fairs.push('Flamengo e Laranjeiras');
    }
    if (fileName.includes('feira_grajau')) {
        fairs.push('Grajaú');
    }
    if (fileName.includes('feira_tijuca')) {
        fairs.push('Tijuca');
    }
    if (fileName.includes('feira_botafogo')) {
        fairs.push('Botafogo');
    }
    if (fileName.includes('feira_leme')) {
        fairs.push('Leme');
    }
    return fairs;
}

function getThemeCategories(fileName: string): GalleryTheme[] {
    const themes: GalleryTheme[] = [];
    if (fileName.startsWith('fot_')) {
        themes.push('Fotografias');
    } else if (fileName.startsWith('aagr_')) {
        themes.push('Agricultores - Animações e Cartoon');
    } else if (fileName.startsWith('aali_')) {
        themes.push('Alimentos - Animações e Cartoon');
    } else if (fileName.startsWith('ap_')) {
        themes.push('Personagens - Animações e Cartoon');
    } else if (fileName.startsWith('especial')) {
        themes.push('Dias Especiais');
    }

    if (fileName.includes('_story_')) {
        themes.push('Story');
    }
    
    return themes.length > 0 ? themes : [];
}

function extractFileNameFromUrl(url: string): string {
    try {
        const decodedUrl = decodeURIComponent(url);
        const path = new URL(decodedUrl).pathname;
        const parts = path.split('/');
        return parts[parts.length - 1].split('?')[0];
    } catch (e) {
        const lastSlashIndex = url.lastIndexOf('%2F');
        const questionMarkIndex = url.indexOf('?');
        if (lastSlashIndex !== -1) {
            const end = questionMarkIndex > -1 ? questionMarkIndex : url.length;
            return decodeURIComponent(url.substring(lastSlashIndex + 3, end));
        }
        return `arquivo-${Math.random()}`;
    }
}

export function getNewGalleryItems(): GalleryItem[] {
  return allItemUrls.map((url, index) => {
    const fileName = extractFileNameFromUrl(url);
    const id = `new-item-${index}-${fileName.split('.')[0]}`;
    
    let title = fileName
      .replace(/_/g, ' ')
      .replace(/\.(jpg|png|mp4|jpeg)$/i, '');

    const parts = title.split(' ');
    if (parts.length > 2 && /^\d+$/.test(parts[1])) {
        title = parts.slice(2).join(' ');
    }
     if (/^\d+$/.test(parts[0])) {
        title = parts.slice(1).join(' ');
    }

    title = title
        .replace(/ feira(s)? (de|do|da)? (grajau|tijuca|botafogo|leme|flamengo|laranjeiras|todas)/gi, '')
        .replace(/feiras flamengo laranjeiras/gi, '')
        .replace(/\b\w/g, l => l.toUpperCase());

    const type = fileName.endsWith('.mp4') ? 'video' : 'image';
    const dataAiHint = title.toLowerCase().split(' ').slice(0, 2).join(' ');

    return {
      id,
      url,
      title,
      type,
      dataAiHint,
      fair: getFairCategories(fileName),
      theme: getThemeCategories(fileName),
    };
  });
}

