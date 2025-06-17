function PageNotFoundIcon() {
  return (
    <svg
      width={592}
      height={640}
      viewBox="0 0 592 640"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={296} cy={320} r={174.545} fill="#EAECF0" />
      <circle cx={112.727} cy={189.09} r={17.4545} fill="#F2F4F7" />
      <circle cx={488} cy={420.363} r={13.0909} fill="#F2F4F7" />
      <circle cx={110.545} cy={446.545} r={21.8182} fill="#F2F4F7" />
      <circle cx={514.182} cy={245.818} r={21.8182} fill="#F2F4F7" />
      <circle cx={472.727} cy={169.454} r={15.2727} fill="#F2F4F7" />
      <g filter="url(#filter0_dd_598_7902)">
        <path
          d="M303.605 180.363c44.673 0 83.037 27.008 99.659 65.586a76.702 76.702 0 018.809-.506c41.933 0 75.927 33.995 75.927 75.928 0 41.934-33.994 75.928-75.927 75.928l-.141-.001H195.138l-1.122-.007c-47.407-.601-85.652-39.217-85.652-86.767 0-47.924 38.85-86.774 86.774-86.774a87.04 87.04 0 0119.992 2.316c19.657-27.658 51.959-45.703 88.475-45.703z"
          fill="#F9FAFB"
        />
        <circle
          cx={195.138}
          cy={310.524}
          r={86.774}
          fill="url(#paint0_linear_598_7902)"
        />
        <circle
          cx={303.605}
          cy={288.831}
          r={108.468}
          fill="url(#paint1_linear_598_7902)"
        />
        <circle
          cx={412.073}
          cy={321.371}
          r={75.9273}
          fill="url(#paint2_linear_598_7902)"
        />
      </g>
      <rect
        x={234.909}
        y={328.727}
        width={122.182}
        height={122.182}
        rx={61.0909}
        fill="#344054"
        fillOpacity={0.4}
      />
      <path
        d="M318.909 412.725L310 403.816m6.364-15.272c0 11.949-9.687 21.636-21.637 21.636-11.949 0-21.636-9.687-21.636-21.636 0-11.95 9.687-21.637 21.636-21.637 11.95 0 21.637 9.687 21.637 21.637z"
        stroke="#fff"
        strokeWidth={4.36364}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_dd_598_7902"
          x={88.3635}
          y={180.363}
          width={419.637}
          height={256.936}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius={4}
            in="SourceAlpha"
            result="effect1_dropShadow_598_7902"
          />
          <feOffset dy={8} />
          <feGaussianBlur stdDeviation={4} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.03 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_598_7902"
          />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius={4}
            in="SourceAlpha"
            result="effect2_dropShadow_598_7902"
          />
          <feOffset dy={20} />
          <feGaussianBlur stdDeviation={12} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.08 0" />
          <feBlend
            in2="effect1_dropShadow_598_7902"
            result="effect2_dropShadow_598_7902"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_598_7902"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_598_7902"
          x1={128.507}
          y1={253.191}
          x2={281.912}
          y2={397.298}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D0D5DD" />
          <stop offset={0.350715} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_598_7902"
          x1={220.317}
          y1={217.165}
          x2={412.073}
          y2={397.298}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D0D5DD" />
          <stop offset={0.350715} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="paint2_linear_598_7902"
          x1={353.771}
          y1={271.204}
          x2={488}
          y2={397.298}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D0D5DD" />
          <stop offset={0.350715} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default PageNotFoundIcon
